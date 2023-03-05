import { EValidators } from "../types"
import { validators } from "../validators"

describe('test validation email', () => {
    test('only word', () => {
        expect(validators('pudov', EValidators.Email)).not.toBe(true)
    })

    test('correct email with common nick', () => {
        expect(validators('pudov@mail.com', EValidators.Email)).toBe(true)
    })

    test('email without dot', () => {
        expect(validators('pudov@mail', EValidators.Email)).not.toBe(true)
    })

    test('email without @', () => {
        expect(validators('pudovmail.com', EValidators.Email)).not.toBe(true)
    })

    test('without @ and dot', () => {
        expect(validators('pudovmailcom', EValidators.Email)).not.toBe(true)
    })

    test('with specific simbols', () => {
        expect(validators('pu12/52_3dov@mail.com', EValidators.Email)).toBe(true)
    })

    test('with split words', () => {
        expect(validators('pu12/52_3dov @mail.com', EValidators.Email)).not.toBe(true)
    })
})