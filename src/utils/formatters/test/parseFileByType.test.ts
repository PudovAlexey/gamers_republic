import { EMessageAdd } from "@/api/types"
import { parseFileByType } from "../formatters"

describe('parse File', () => {

    test('file error', () => {
        const file = {type: 'test'} as File
        expect(parseFileByType(file)).toBe({
            type: 'error',
            message: 'unnoun type of file'
        })
    })

    test('image', () => {
        const file = {type: 'image/153'} as File
        expect(parseFileByType(file)).toBe(EMessageAdd.Img)
    })

    test('audio', () => {
        const file = {type: 'test/audio/43'} as File
        expect(parseFileByType(file)).toBe(EMessageAdd.Audio)
    })
})