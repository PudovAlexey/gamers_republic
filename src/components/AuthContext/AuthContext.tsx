import React, { useEffect, useState } from "react"
import api from "../../api/api"
import { User } from "../../types/types"

export const AuthContext = React.createContext(null)
function Auth({children}) {
    let [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        let token = "testToken"
        api.getAuthUser(token).then((user: User) => {
         setUser(user)
        })
        }, [])
    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth