import { camelCaseToText } from "../formatters"


describe('camel Case To Text', () => {

    test('helloWord check', () => {
        expect(camelCaseToText('hellowWord')).toBe('Hellow Word')
    })

    test('from upperCase', () => {
        expect(camelCaseToText('HelloMyFriendMyNameIsAlex')).toBe('Hello My Friend My Name Is Alex')
    })

    test('from lowercase', () => {
        expect(camelCaseToText('heyHowAreYouMyFriend')).toBe('Hey How Are You My Friend')
    })
})