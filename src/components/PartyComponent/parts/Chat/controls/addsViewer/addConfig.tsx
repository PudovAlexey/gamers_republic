import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { FileGalery } from "../../../../../reusable/FileGalery/FileGalery"
import { ImageGalery } from "../../../../../reusable/ImageGalery/ImageGalety"
import { ShowMoreModal } from "./ShowMoreModal"
import { VoiseAddsGalery } from "./VoiseAddsGalery/VoiseAddsGalery"

type TConfig = Record<string, 
(props: any, showCount: any, showMoreButton: boolean) => JSX.Element >

const addConfig: TConfig = {
    img: (props, showCount, showMoreButton) => {
        return <ShowMoreModal
        showMoreButton={showMoreButton}
         maxShow={showCount?.img || 4} 
         items={[...props]}
         renderItems={(items) => <ImageGalery images={items}/>}
         />
    },
    audio: (audios, showCount, showMoreButton) => <ShowMoreModal
    showMoreButton={showMoreButton}
    maxShow={showCount?.audio || 4} 
    items={[...audios]}
    renderItems={(items) => <VoiseAddsGalery audios={items}/>}
    />,
    file: (audios, showCount, showMoreButton) => <ShowMoreModal
    showMoreButton={showMoreButton}
    maxShow={showCount?.files || 4} 
    items={[...audios]}
    renderItems={(items) => <FileGalery files={items}/>}
    />
}

export {
    addConfig
}