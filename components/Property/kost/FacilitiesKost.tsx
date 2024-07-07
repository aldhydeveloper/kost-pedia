import Checkbox from "@/components/Checkboxes/Checkbox";
import { Facilities } from "@/service";
import { memo, useEffect } from "react";

type tFacility = {
  id: string;
  name: string;
  type: number;
  checked: boolean;
};
interface iFacilities {
  dataFacilities: tFacility[];
  handleDataFacilities: (facilities: tFacility[]) => void;
}
const FacilitiesKost = memo(function FacilitiesKost({
  dataFacilities,
  handleDataFacilities,
}: iFacilities) {
  // const [facilitiesList, setFacilitiesList] = useState<tFacility[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = dataFacilities.map((v) => {
      // console.log(v.id === target.value);
      if (v.id == e.target.value) {
        return { ...v, checked: true };
      } else {
        return v;
      }
    });
    handleDataFacilities(temp);
  };
  useEffect(() => {
    if (dataFacilities.length === 0) {
      Facilities("all").then((resp) => {
        // console.log(resp);
        if (resp.success) {
          const temp = resp.data.map((v: tFacility) => {
            return { ...v, chekced: false };
          });
          // setFacilitiesList(temp);
          handleDataFacilities(temp);
        }
      });
    }
  }, [dataFacilities, handleDataFacilities]);
  console.log("rnder facilities");
  return (
    <>
      <label className="font-bold text-xl mb-4 block">Fasilitas Kost</label>
      {dataFacilities && (
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {dataFacilities
            .filter((v) => v.type === 1)
            .map((v) => (
              <li key={v.id}>
                <Checkbox
                  id={`check${v.id}`}
                  value={v.id}
                  label={v.name}
                  checked={v.checked}
                  name="room_facilities"
                  onChange={handleChange}
                />
              </li>
            ))}
        </ul>
      )}
      <label className="font-bold text-xl mb-4 block">
        Fasilitas Kamar Mandi
      </label>
      {dataFacilities && (
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {dataFacilities
            .filter((v) => v.type === 3)
            .map((v) => (
              <li key={v.id}>
                <Checkbox
                  id={`check${v.id}`}
                  value={v.id}
                  label={v.name}
                  checked={v.checked}
                  name="bath_facilities"
                  onChange={handleChange}
                />
              </li>
            ))}
        </ul>
      )}
    </>
  );
});

export default FacilitiesKost;
export type { tFacility, iFacilities };
