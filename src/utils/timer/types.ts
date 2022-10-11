export enum TimerType {
    Seconds = "seconds",
    Minutes = "minutes",
    Hours = "hours",
    Days = "days"
}

export type TParseTime = {
    duration: number,
    type: TimerType,
    formatter: (seconds: number, minutes: number, hours: number, days: number) => string,
    toTimeParse: boolean
}