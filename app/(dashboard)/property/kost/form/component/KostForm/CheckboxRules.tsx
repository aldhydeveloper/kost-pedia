import Checkbox from '@/components/Checkboxes/Checkbox';
import { useForm, } from '../FormHook';
import { useKost, tRules } from './KostHook'
import useStore from "../store";

const Rules =  () => {
    const kost_rules = useStore(({ state }) => state.kost.kost_rules);
    const  { rules }  = useKost();
    const  { handleCheckbox }  = useForm();
    return <>
        <p className="mb-2">Peraturan Kost</p>
        { rules.length > 0 && (
            <ul className="grid grid-cols-2 gap-2 mb-8">
                {rules.map((v:tRules) => (
                <li key={v.id}>
                    <Checkbox
                    id={`check${v.id}`}
                    value={v.id}
                    label={v.name}
                    checked={kost_rules.includes(v.id)}
                    name="kost_rules"
                    data-param="kost"
                    onChange={(e) => {
                        handleCheckbox(e, kost_rules)
                    }}
                    />
                </li>
                ))}
            </ul>
            )
        }
    </>
}

export default Rules;