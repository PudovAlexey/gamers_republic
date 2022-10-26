import { type } from "os";

 enum EGameItems {
    X = 'X',
    O = 'O'
}

enum EGameModes {
    Pc = 'pc',
    Koop = 'koop',
    Online = 'online'
}

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
        key: EGameModes,
        value: string,
        checked?: boolean
    }
    timer: {
        isOn: boolean,
        tick: string
    }
}

export {
    TIconsDict,
    EGameItems,
    EGameModes
}

