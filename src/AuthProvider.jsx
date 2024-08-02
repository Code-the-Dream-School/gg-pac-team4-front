import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ firstName: "", lastName: "", role: "" })
    const isToken = sessionStorage.getItem('isToken');

    useEffect(() => {
        if (isToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isToken]);

    const loginAction = (status, data) => {
        sessionStorage.setItem('isToken', status);
        setIsLoggedIn(true);
        setUserData({ firstName: data.firstName, lastName: data.lastName, role: data.role });
    };

    const logoutAction = () => {
        sessionStorage.removeItem('isToken');
        setIsLoggedIn(false);
        setUserData({ firstName: "", lastName: "", role: "" });
    };

    return <AuthContext.Provider value={{isLoggedIn, userData, loginAction, logoutAction}}>{children}</AuthContext.Provider>;
};

