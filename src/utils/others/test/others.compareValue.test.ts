import { compareValue } from ".."
import { ECompareValue } from "../../types"


describe('test function compare values', () => {
    test('check standart', () => {
        expect(compareValue('New test data 1', 'New test data 1', ECompareValue.Standart)).toBe(true)
    })

    test('check loverCase', () => {
        expect(compareValue('new test data 1', 'New TEST data 1', ECompareValue.LoverCase)).toBe(true)
    })

    test('check substring', () => {
        expect(compareValue('new test data 1', 'test data', ECompareValue.Substring)).toBe(true)
    })

    test('check every of', () => {
        expect(compareValue([5, 5, 5], 5, ECompareValue.EveryOf)).toBe(true)
    })

    test('check some of', () => {
        expect(compareValue([1, 2, 3, 4, 5], 5, ECompareValue.SomeOf)).toBe(true)
    })

    test('check every of lower', () => {
        expect(compareValue(['test2', 'test', 'test'], 'test', ECompareValue.EveryOfLower)).toBe(false)
    })

    test('check some of lower', () => {
        expect(compareValue(['test2', 'test', 'test'], 'test', ECompareValue.SomeOfLower)).toBe(true)
    })
})