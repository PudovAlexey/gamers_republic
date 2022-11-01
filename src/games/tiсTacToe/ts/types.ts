import { type } from "os";
import { EGameItems } from "./enums";

type TDictValues = {key: EGameItems, value: string}

type TIconsDict = {
    [EGameItems.X]: TDictValues
    [EGameItems.O]: TDictValues
}

type TUserData = {
    key: EGameItems,
    countWin: number,
    data: {
        username: string,
        avatar?: string,
        name?: string,
        surname?: string
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

type TCoords = {
    col: 'A' | 'B' | 'C'
    row: 1 | 2 | 3
}

type TValue = {
    key?: EGameItems
    value?: string
}

type TGameRow = {
    1: TValue
    2: TValue
    3: TValue
}

type TGameField = {
    A: TGameRow
    B: TGameRow
    C: TGameRow
}

export type {
    TIconsDict,
    TGamersConfig,
    TGameField,
    TCoords
}

