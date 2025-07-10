import { tFacilities } from '../FormType';
import useStore from '../store';

const useFacilities = () => {
    const dispatch = useStore(s => s.dispatch);
    const facilities = useStore(s => s.state.facilities)

    const handleChangeCheckbox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        let newValue = e.target.checked ? [...facilities.value, val] : facilities.value.filter(v => v !== val);
        dispatch({
            type: 'SET_FIELD',
            field: 'value',
            param: 'facilities',
            value: newValue
        })
        // if(e.target.checked)

    }
    return { handleChangeCheckbox }
}

export default useFacilities