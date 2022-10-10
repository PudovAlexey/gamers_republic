export enum Color  {
    Red = "Red",
    Black = "Black"
}

export enum Side {
    Top = "Top",
    Bottom = "Bottom"
}

export type TField = {
    figure?: any,
    light?: string,
    key?: Color,
    updateToQueen?: boolean
}

export type TLights = Coords & {
    eat?: Coords
}

export type FieldState = Record<string, Record<string, TField>>

export interface IFigure {
    coords?: Coords,
    color: Color,
    side: Side,
    fieldState: FieldState
}

export type Coords = {
    col: string,
    row: string | number
}