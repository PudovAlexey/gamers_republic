import { parseTime } from "../timer"
import { TimerType } from "../types"


describe('parseTime', () => {

    test('parseTime 2 minutes remaining', () => {
        expect(parseTime({duration: 120000, type: TimerType.Minutes})).toBe(2)
    })

    test('parseTime 2:30 minutes remaining', () => {
        expect(parseTime({duration: 150000, formatter: (v) => v})).toEqual({
            seconds: 150,
            minutes: 2,
            hours: 0,
            days: 0,
        })
    })
})