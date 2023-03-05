import { randomUnit } from ".."


describe('test random units', () => {
    test('common letters 1st greather then 2', () => {
        const min = 0;
        const max = 4;
    const funcResult = randomUnit(min, max)
     expect(funcResult).toBeGreaterThanOrEqual(min)
     expect(funcResult).toBeLessThanOrEqual(max)
    })

    test('error 2nd greather then 1st', () => {
        const min = 4;
        const max = 0;
    const funcResult = randomUnit(min, max)
     expect(funcResult).toEqual({
        type: 'error',
        message: `max value mast to be greather than min value. minValue ${min} maxValue ${max}`
     })
    })

    test('error 2nd equals 1st', () => {
        const min = 4;
        const max = 4;
    const funcResult = randomUnit(min, max)
     expect(funcResult).toBe(min)
    })
})