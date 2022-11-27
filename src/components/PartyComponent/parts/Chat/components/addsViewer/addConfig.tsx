import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { ImageGalery } from "../../../../../reusable/ImageGalery/ImageGalety"
import { ShowMoreModal } from "./ShowMoreModal"
import { VoiseAddsGalery } from "./VoiseAddsGalery/VoiseAddsGalery"

type TConfig = Record<string, 
(props: any) => ReactJSXElement >

const addConfig: TConfig = {
    img: (props) => {
        const images = props.map(prop => ({
            src: prop,
            alt: prop
        }))
        return <ShowMoreModal
         maxShow={4} 
         items={images}
         renderItems={(items) => <ImageGalery images={items}/>}
         />
    },
    audio: (audios) => <ShowMoreModal
    maxShow={4} 
    items={[...audios]}
    renderItems={(items) => <VoiseAddsGalery audios={items}/>}
    />
}

export {
    addConfig
}