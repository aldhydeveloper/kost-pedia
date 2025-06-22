'use client'
import { ChangeEvent, SyntheticEvent  } from "react";
import useStore, { initialStateRoom } from "../store";

const useRoom = () => {
    const dispatch = useStore(s => s.dispatch);
    const state = useStore(s => s.state);
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const index = e.target.getAttribute("data-index") ?? 0;
        const val = e.target.value;
        const field = e.target.name;
        // console.log(field)
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, [field]: val} : v)
        })
    }
    const handleCheckbox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const index = e.target.getAttribute("data-index") ?? 0
        const val = parseInt(e.target.value);
        const name = e.target.name as 'room_facilities' | 'bath_facilities';
        console.log(state.rooms[index as number])
        const facilities = e.target.checked ? [...state.rooms[index as number][name], val] : state.rooms[index as number][name].filter(v => v !== val);

        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, [name]: facilities} : v)
        })
    }
    const handleDeleteRooms = () => {

    }
    const handleAddRoom = () => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: [...state.rooms, initialStateRoom]
        })
    }

    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>, index:number) => {
        const file = e.target.files ? e.target.files[0] : [];
        // const index = e.target.getAttribute("data-index") ?? 0 as number;
        const name = e.target.name as string;
     
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, [name]: file} : v)
        })
    }

    const handleChangeFileMulti = (e:ChangeEvent<HTMLInputElement>, index:number) => {
        const file = e.target.files?.[0]
        // const index =  parseInt(e.target.getAttribute("data-index") as string) ?? 0 as number;
        const name = e.target.name as 'second_image';
        // console.log(index)
        // console.log(state.rooms)
        if(Array.isArray(state.rooms[index][name]) && file){
            const newValue = [...state.rooms[index][name], file];
            // console.log(newValue)
            dispatch({
                type: 'SET_FIELD_ROOM',
                value: state.rooms
            })
        }
    }

    
    const handleDeleteImage = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
        const name = e.currentTarget.name as 'first_image' | 'third_image';
        // const newValue = state.rooms[index][name] = un
        // console.log(newValue)
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, [name]: undefined} : v)
        })
    }
    const handleDeleteImageMulti = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
        const name = e.currentTarget.name as 'second_image';
        const indexImage = e.currentTarget.getAttribute('data-key') ?? 0;
        // const newValue = state.rooms[index][name] = un
        // console.log(indexImage)
        if(Array.isArray(state.rooms[index][name])){
            const newValue = state.rooms[index][name].filter((v, i) => i != indexImage);
            console.log(newValue)
            dispatch({
                type: 'SET_FIELD_ROOM',
                value: state.rooms.map((v,i) => i == index ? {...v, second_image: newValue} : v)
            })
        }
    }

    const handleStatusRoom = (checked:boolean, index:number) => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, active: checked} : v)
        })
    }

    const setThumbnail = (file:string, index:number |undefined) => {
        dispatch({
            type: 'SET_FIELD_ROOM',
            value: state.rooms.map((v,i) => i == index ? {...v, thumbnail: file} : v)
        })
    }

    return { handleChange, handleDeleteRooms, handleAddRoom, handleCheckbox, handleChangeFile, handleChangeFileMulti, handleDeleteImage, handleDeleteImageMulti, handleStatusRoom, setThumbnail }
}

export default useRoom;