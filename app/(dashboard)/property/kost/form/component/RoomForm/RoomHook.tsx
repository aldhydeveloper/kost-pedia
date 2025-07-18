'use client'
import { ChangeEvent  } from "react";
import useStore, { initialStateRoom } from "../store";
import { NumberFormatValues } from "react-number-format";

const useRoom = () => {
    const dispatch = useStore(s => s.dispatch);
    const rooms = useStore(s => s.state).rooms;
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const index = e.target.getAttribute("data-index") ?? 0;
        const val = e.target.value;
        const field = e.target.name;
        // console.log(field)
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, [field]: val} : v)
        })
    }
    const handleChangeNumeric = (values:NumberFormatValues, index:number, name:string) => {
        // const index = e.target.getAttribute("data-index") ?? 0;
        // const val = e.target.value;
        // const field = e.target.name;
        // // console.log(field)
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, [name]: values} : v)
        })
    }
    const handleCheckbox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const index = e.target.getAttribute("data-index") ?? 0
        const val = parseInt(e.target.value);
        const name = e.target.name as 'facilities' | 'bath_facilities';
        console.log(rooms[index as number])
        const facilities = e.target.checked ? [...rooms[index as number][name], val] : rooms[index as number][name].filter(v => v !== val);

        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, [name]: facilities} : v)
        })
    }
    const handleDeleteRooms = () => {

    }
    const handleAddRoom = () => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: [...rooms, initialStateRoom]
        })
    }

    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>, index:number) => {
        const file = e.target.files ? e.target.files[0] : [];
        // const index = e.target.getAttribute("data-index") ?? 0 as number;
        const name = e.target.name as string;
     
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, [name]: file} : v)
        })
    }

    const handleChangeFileMulti = (e:ChangeEvent<HTMLInputElement>, index:number) => {
        const file = e.target.files?.[0]
        // const index =  parseInt(e.target.getAttribute("data-index") as string) ?? 0 as number;
        const name = e.target.name as 'inside_image_room';
        // console.log(index)
        // console.log(rooms[index][name])
        if(Array.isArray(rooms[index][name]) && file){
            // let room = [...rooms];
            // image = file;
            // room[index][name] = [...rooms[index][name] as File[], file];
            const newValue = rooms.map((v, i) => {
                // console.log([...v[name], file])
                if(i == index){
                    const newImage = [...(v[name] || []), file];
                    return {...v, [name]: newImage}
                }
                return v;
            })
            // console.log(newValue)
            dispatch({
                type: 'SET_FIELD_ROOM',
                value: newValue
            })
        }
    }

    
    const handleDeleteImage = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
        const name = e.currentTarget.name as 'first_image' | 'third_image';
        // const newValue = state.rooms[index][name] = un
        // console.log(newValue)
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, [name]: undefined} : v)
        })
    }
    const handleDeleteImageMulti = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
        const name = e.currentTarget.name as 'inside_image_room';
        const indexImage = e.currentTarget.getAttribute('data-key') ?? 0;
        // const newValue = rooms[index][name] = un
        // console.log(indexImage)
        if(Array.isArray(rooms[index][name])){
            const newValue = (rooms[index][name] as File[]).filter((v, i) => i != indexImage);
            // console.log(newValue)
            dispatch({
                type: 'SET_FIELD_ROOM',
                value: rooms.map((v,i) => i == index ? {...v, [name]: newValue} : v)
            })
        }
    }

    const handleStatusRoom = (checked:boolean, index:number) => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, active: checked} : v)
        })
    }

    const setThumbnail = (file:string, index:number |undefined) => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: rooms.map((v,i) => i == index ? {...v, thumbnail: file} : v)
        })
    }

    return { handleChange, handleChangeNumeric, handleDeleteRooms, handleAddRoom, handleCheckbox, handleChangeFile, handleChangeFileMulti, handleDeleteImage, handleDeleteImageMulti, handleStatusRoom, setThumbnail }
}

export default useRoom;