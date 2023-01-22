import { User } from "../../../../types/types";
import { TUser } from "../../../types";
import avatar from './assets/user.jpg'

// export const Users: User[] = [
//     {
//         id: 1,
//         username: 'darkStalker',
//         name: 'Aleksey',
//         email: "text@mail.com",
//         surname: 'Pudov',
//         token: 'testToken',
//         roomId: 10,
//         password: 'TruePassword123!!!',
//         favoriteCategories: [],
//         likeGamesIds: [1, 3],
//         avatar: avatar,
//     },
//     {
//         id: 2,
//         username: 'pudov',
//         name: 'Aleksey',
//         email: "text1@mail.com",
//         surname: 'Pudov',
//         token: 'testToken',
//         roomId: 10,
//         favoriteCategories: [],
//         password: 'qwerty!!!',
//         likeGamesIds: [1, 3],
//         avatar: avatar,
//     },
//     {
//         id: 3,
//         username: 'Alex',
//         name: 'Aleksey',
//         email: "text2@mail.com",
//         surname: 'Pudov',
//         token: 'testToken',
//         roomId: 10,
//         password: 'qwerty!123',
//         favoriteCategories: [],
//         likeGamesIds: [1, 3],
//         avatar: avatar,
//     },
//     {
//         id: 4,
//         username: 'leksiy',
//         email: "text3@mail.com",
//         name: 'Aleksey',
//         surname: 'Pudov',
//         password: 'qwerty!12345',
//         token: 'testToken',
//         favoriteCategories: [],
//         likeGamesIds: [1, 3],
//         avatar: avatar,
//     },
// ]

function userGenerator(count): TUser[] {
    return new Array(count)
    .fill('')
    .map((_, idx) => ({
        roomId: 10,
        email: `fakeUser${idx + 1}@mail.com`,
        id: idx + 1,
        unreadMessages: [],
        username: `Fake User ${idx + 1}`,
        name: `Name User ${idx + 1}`,
        surname: `Surname User ${idx + 1}`,
        password: `Qwerty${idx + 1}!!!`,
        token: `token${idx + 1}`,
        favoriteCategories: [],
        likeGameIds: [1, 3],
        avatar: avatar,
        friendsIds: [2, 5, 15, 37, 46]
    }))
}

export const Users = userGenerator(100)