import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import useLocalStorage from '../../hooks/useLocalStorage';
import { onInit } from '../../store/authSlice/authSlice';
import { User } from '../../types/types';

export const AuthContext = React.createContext(null);
function Auth({ children }) {
  const dispatch = useAppDispatch();
  let { getItemByPath } = useLocalStorage();
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let token = getItemByPath('authToken');
    api.getAuthUser(token).then((user: User) => {
      if (user) {
        setUser(user);
        dispatch(onInit(user));
      }
    });
  }, [user, getItemByPath, dispatch]);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
