import { EValidators } from "../types"
import { validators } from "../validators"

describe('test validation password', () => {
    test('password without Uppercase', () => {
        expect(validators('pudov@mail.com', EValidators.Password)).not.toBe(true)
    })

    test('password without Speciphic simbols', () => {
        expect(validators('pudov@mail.com', EValidators.Password)).not.toBe(true)
    })

    test('correct password with upperCase, one number', () => {
        expect(validators('puDov1!@mail.com', EValidators.Password)).toBe(true)
    })

    test('password less to be 6 simbols', () => {
        expect(validators('Pud1', EValidators.Password)).not.toBe(true)
    })

    test('correct password with two uppercases', () => {
        expect(validators('PuDov@mail1', EValidators.Password)).toBe(true)
    })
})