import { EValidators } from "../types"
import { validators } from "../validators"

describe('test validation name', () => {
    test('only word', () => {
        expect(validators('Pudov', EValidators.Name)).toBe(true)
    })

    test('word with simbols', () => {
        expect(validators('Pu5232dov', EValidators.Name)).not.toBe(true)
    })

    test('word with two words', () => {
        expect(validators('Pudov Alexey', EValidators.Name)).not.toBe(true)
    })

    test('with speciphic simbols', () => {
        expect(validators('Pud/_ov', EValidators.Name)).not.toBe(true)
    })
})