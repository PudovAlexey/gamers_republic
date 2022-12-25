import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { ImageGalery } from "../../../../../reusable/ImageGalery/ImageGalety"
import { ShowMoreModal } from "./ShowMoreModal"
import { VoiseAddsGalery } from "./VoiseAddsGalery/VoiseAddsGalery"

type TConfig = Record<string, 
(props: any, showCount: any, showMoreButton: boolean) => JSX.Element >

const addConfig: TConfig = {
    img: (props, showCount, showMoreButton) => {
        const images = props.map(prop => ({
            src: prop,
            alt: prop
        }))
        return <ShowMoreModal
        showMoreButton={showMoreButton}
         maxShow={showCount?.img || 4} 
         items={images}
         renderItems={(items) => <ImageGalery images={items}/>}
         />
    },
    audio: (audios, showCount, showMoreButton) => <ShowMoreModal
    showMoreButton={showMoreButton}
    maxShow={showCount?.audio || 4} 
    items={[...audios]}
    renderItems={(items) => <VoiseAddsGalery audios={items}/>}
    />
}

export {
    addConfig
}