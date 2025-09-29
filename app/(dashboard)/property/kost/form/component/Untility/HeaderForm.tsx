import { IconType } from "react-icons";

interface iProps { 
    title: string;
    desc: React.ReactNode;
    Icon: IconType
}
const HeaderForm = ({title, desc, Icon}:iProps) => {
    return <div className="flex items-center gap-4 mb-6">
            <Icon className="text-4xl" />
            <div>
                <h3 className="text-lg font-semibold leading-5">{title}</h3>
                <p className="text-sm">{desc}</p>
            </div>
        </div>
}

export default HeaderForm;