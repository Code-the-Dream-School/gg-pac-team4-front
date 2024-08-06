import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    
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
    
    const clearUserSession = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData({});
    };

    return <AuthContext.Provider value={{isLoggedIn, userData, setUserSession, clearUserSession}}>{children}</AuthContext.Provider>;
};