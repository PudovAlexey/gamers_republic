import { getNodeByPath } from ".."

describe('get node by path', () => {
    test('check correct node value', () => {
        type TTestType = {
            node: {
                index: number
            }[]
        }
        const path = 'node/1/index'
        const node = {
            node: [
                {index: 1},
                {index: 2}
            ]
        }
        expect(getNodeByPath<TTestType, number>({path, node})).toBe(2)
    })

    test('check incorrect path', () => {
        type TTestType = {
            node: {
                index: number
            }[]
        }
        const path = 'node/5/index'
        const node = {
            node: [
                {index: 1},
                {index: 2}
            ]
        }
        expect(getNodeByPath<TTestType, number>({path, node})).toEqual({
            type: 'error',
            message: 'current value path is incorrect. please check value path and try again'
        })
    })

    test('check part in deep object', () => {
        type TTestType = {
            node: {
                tests: {
                    values: {
                        cars: {
                            mazda: {
                                cabrio: string
                            }[]
                        }[]
                    }
                }
            }
        }
        const path = 'node/tests/values/cars/5/mazda/3/cabrio'
        const node: TTestType = {
            node: {
                tests: {
                    values: {
                        cars: [
                            {mazda: [ {cabrio: 'unavalible'}]},
                            {mazda: [ {cabrio: 'unavalible'}]},
                            {mazda: [ {cabrio: 'unavalible'}]},
                            {mazda: [ {cabrio: 'unavalible'}]},
                            {mazda: [ {cabrio: 'unavalible'}]},
                            {mazda: [
                                {cabrio: 'unavalible'},
                                {cabrio: 'unavalible'},
                                {cabrio: 'unavalible'},
                                {cabrio: 'avalible'},
                            ]},
                        ]
                    }
                }
            }
        }
        expect(getNodeByPath<TTestType, number>({path, node})).toEqual('avalible')
    })
})