import { EScrollDirection } from "../../../../../../api/types"

type TUpdate = (scrollContainer?: HTMLElement) => {
    scrollDirection: EScrollDirection
    queryMessage: number | null
    messagesOnScreen: HTMLElement[]
    containerChildren: HTMLElement[]

}

type TFindById = (messageId: number) => HTMLElement

type TGetSingleMessage = () => HTMLElement

type TGetAll = () => HTMLElement[]

type TScrollService = {
    update: TUpdate
    findById: TFindById
    getLastMessage: TGetSingleMessage
    getFirstMessage: TGetSingleMessage
    getAllMessages: TGetAll
}

export type {
    TScrollService
}