import { envByUrl } from "../utils/enviroment"

const env = envByUrl()

function parseRoutesENV(init) {
    return Object.keys(init).reduce((routes, route) => {
        routes[route] = env + init[route]
        return routes
    }, {})
}
const ERoutes: Record<string, any> = parseRoutesENV({
    Home: `/`,
    Login: '/login',
    Records: '/records',
    Registration: '/registration',
    Games: '/games',
    Logout: '/logout',
    News: '/news',
    Contact: '/contact',
    Register: '/register'
})



export {
    ERoutes
}