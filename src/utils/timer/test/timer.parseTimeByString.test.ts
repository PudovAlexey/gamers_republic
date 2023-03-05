import { parseTimeByString } from "../timer"
import { TTime } from "../types"


describe('parseTimeByString', () => {

    test('returned value in time', () => {
        expect(parseTimeByString({time: '2022.01.20 15:30', type: TTime.Minutes})).toBe('30')
    })

    test('returned invalid value', () => {
        expect(parseTimeByString({time: '2022.01.2055 15:30', type: TTime.Minutes})).toEqual({
            type: 'error',
            message: 'Invalid Date'
        })
    })

    test('return castom date', () => {
        expect(parseTimeByString({time: '2022.01.20 15:30', formatter: ({hours, minutes}) => `${hours}:${minutes}`})).toBe("15:30")
    })
})