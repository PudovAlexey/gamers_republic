import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import { User } from '../../types/types';

export const AuthContext = React.createContext(null);
function Auth({ children }) {
  let {getItemByPath} = useLocalStorage()
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let token = getItemByPath('authToken');
    api.getAuthUser(token).then((user: User) => {
      if (user) {
        setUser(user);
      } else {

      }
    });
  }, [user]);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
