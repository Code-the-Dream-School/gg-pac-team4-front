import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ firstName: "", lastName: "", role: "" })
    const [token, setToken] = useState(sessionStorage.getItem('token') || "");
    
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    const loginAction = (status, data) => {
        setToken(data.token);
        sessionStorage.setItem('token', data.token);
        setIsLoggedIn(status);
        setUserData({ firstName: data.firstName, lastName: data.lastName, role: data.role });
    };
    
    const logoutAction = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserData({ firstName: "", lastName: "", role: "" });
    };

    return <AuthContext.Provider value={{isLoggedIn, userData, loginAction, logoutAction}}>{children}</AuthContext.Provider>;
};

