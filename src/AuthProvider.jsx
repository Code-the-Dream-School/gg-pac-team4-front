import { createContext, useContext, useEffect, useState } from 'react';

import React from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem('user')) || {}
  );

  useEffect(() => {
    if (userData.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData.token]);

  const setUserSession = (status, data) => {
    sessionStorage.setItem('user', JSON.stringify(data));
    setIsLoggedIn(status);
    setUserData(data);
  };

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(userData));
  }, [userData]);

  const clearUserSession = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token: userData.token,
        userData,
        setUserSession,
        clearUserSession,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
