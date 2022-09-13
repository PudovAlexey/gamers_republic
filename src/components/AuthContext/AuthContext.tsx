import React, { useEffect, useState } from "react"
import api from "../../api/api"

export const AuthContext = React.createContext(null)
function Auth({children}) {
    let [user, setUser] = useState()
    useEffect(() => {
        let token = "testToken"
        api.getAuthUser(token).then(user => {
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