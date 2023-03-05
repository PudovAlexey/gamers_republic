import { interval } from ".."


describe('test utils interval function', () => {
    
    test('number 5 between 2 and 10', () => {
        expect(interval(5, {from: 2, to: 10})).toEqual(true)
    })

    test('invalid value number outside of interval', () => {
        expect(interval(20, {from: 2, to: 10})).toEqual(false)
    })

    test('from case', () => {
        expect(interval(2, {from: 2, to: 10})).toEqual(true)
    })

    test('to case', () => {
        expect(interval(10, {from: 2, to: 10})).toEqual(true)
    })

    test('less than minimum', () => {
        expect(interval(1, {from: 2, to: 10})).toEqual(false)
    })

    test('check errorMessage', () => {
        expect(interval(1, {from: 7, to: 5})).toEqual({
            type: 'error',
            message: `you insert invalid value range.from ${7} mast be greather then range.to ${5}`
        })
    })

    test('if from equals to', () => {
        expect(interval(7, {from: 7, to: 7})).toEqual(true)
    })
})