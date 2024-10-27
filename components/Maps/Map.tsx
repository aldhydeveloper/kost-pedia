'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { getCoordinates } from '@/utils/geocode';

// Memperbaiki masalah ikon default Leaflet di Next.js
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({address}:{address:string}) => {
    // const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  const handleSearch = async () => {
    if(address && !coordinates){
        const coords = await getCoordinates(address);
        setCoordinates(coords);
    }
  };

  useEffect(() => {
    async function getCoord(){
        await handleSearch();
    }
// console.log(coordinates)
    getCoord();
  })
  return (
    <MapContainer
      center={coordinates ? [coordinates.lat, coordinates.lon] : [51.505, -0.09]} // Set lat dan long default
      zoom={13}               // Set zoom level default
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        coordinates ? <Marker position={[51.505, -0.09]}>
      <Popup>Ini adalah lokasi.</Popup>
    </Marker> : ""
      }
    </MapContainer>
  );
};

export default Map;