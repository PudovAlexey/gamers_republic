import { EValidators } from "../types"
import { validators } from "../validators"

describe('test validation userName', () => {
    test('only word', () => {
        expect(validators('Pudov177', EValidators.UserName)).toBe(true)
    })

    test('with speciphic simbols', () => {
        expect(validators('Pud_225@o', EValidators.UserName)).toBe(true)
    })

    test('userNameLess 2 simbols', () => {
        expect(validators('P', EValidators.UserName)).not.toBe(true)
    })

    test('userName has spaces', () => {
        expect(validators('P udov', EValidators.UserName)).not.toBe(true)
    })
})