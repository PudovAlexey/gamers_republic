import { type } from "os";
import { EGameItems } from "./enums";

type TDictValues = {key: EGameItems.X, value: string}

type TIconsDict = {
    [EGameItems.X]: TDictValues
    [EGameItems.O]: TDictValues
}

type TUserData = {
    key: EGameItems,
    countWin: number,
    data: {
        userName: string,
        avatarSrc: string
    }
}

type TGamersConfig = {
    me: TUserData
    rival: TUserData
}

type TGameParams = {
    gameWith: {
        key: EGameItems,
        value: string,
        checked?: boolean
    }
    timer: {
        isOn: boolean,
        tick: string
    }
}

export type {
    TIconsDict,
}

