export enum TimerType {
    Seconds = "seconds",
    Minutes = "minutes",
    Hours = "hours",
    Days = "days"
}

export type TParseTime = {
    duration: number,
    type?: TimerType,
    formatter?: (TimerType) => string,
}