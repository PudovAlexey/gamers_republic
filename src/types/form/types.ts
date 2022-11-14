type TControlOptions<T> = {
    id: T,
    label: string
}

type TField<T> = boolean | string | number | number[] | TControlOptions<T>

export type {
    TField
}