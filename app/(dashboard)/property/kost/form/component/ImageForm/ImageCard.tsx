
import { RiEyeFill } from "react-icons/ri";
import ImageInput from "./ImageInput";
import ImageWrap from "./ImageWrap";
import { tInputImage } from "./ImageType";

// type tInputImage = {
//     title: string;
//     desc: string;
//     file: File | FileList | undefined;
// }

const ImageBox = ({children, ...props}:{children:React.ReactNode}) => {
    return <div {...props} className="overflow-hidden relative">
        {children}
    </div>
}
const ImageCard = ({id, name, title, desc, file}:tInputImage) =>{
    // console.log(file)
    // const { setImageValue } = useImage();
    
    // useEffect(() => {
    //     setImageValue({
    //         imageId: id,
    //         imageName: name
    //     })
    // }, [id, name, setImageValue])
    // const file  = useStore(store => store.state.image[name]);
    // const value = {imageId: id, imageName: name as keyof tInputImage, isArray: Array.isArray(file) };
    // console.log(`Render ${name}`)
    // console.log(file && file.length)
    return <>
        <div className="mb-3">
            <div className="mb-1">
                <label className="leading-4 block dark:text-white">
                    {title}
                </label>
                <small>
                    {desc}
                </small>
            </div>
            <div className="pb-6 pt-3 grid grid-cols-3 gap-4 h-[260px]">
                
                    {
                        !Array.isArray(file) 
                        ? (
                            <ImageBox>
                            {
                                file ? <ImageWrap id={id} name={name} file={file} isArray={false} /> : <ImageInput id={id} name={name} isArray={false} />
                            }
                            </ImageBox>
                        ) : (
                            <>
                                { file.map((v, i) => <ImageBox key={i}><ImageWrap isArray={true} id={id} name={name} index={i} file={v} /> </ImageBox>) }
                                
                                { file.length >= 0 && file.length < 3 && <ImageBox><ImageInput id={id} name={name} isArray={Array.isArray(file)} /></ImageBox>}
                            </>   
                        )
                    }
                
            </div>
        </div>
    </>
}

export default ImageCard;