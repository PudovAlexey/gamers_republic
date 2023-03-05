import { makeTimeString } from "../timer"

describe('set string from date', () => {
    test('set date from 15.03.2015', () => {
        expect(makeTimeString(new Date('2015.03.15'))).toBe('15.03.2015 00:00')
    })
})