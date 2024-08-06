import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DesktopNav from "../navbars/DesktopNav";
import MobileNav from "../navbars/MobileNav";
import ProfileNav from "../navbars/ProfileNav";

const Header = () => {
    const [isSearch, setIsSearch] = useState(true);
    const [isLoginBtn, setIsLoginBtn] = useState(true);
    const [isJoinBtn, setIsJoinBtn] = useState(true);
    
    const location = useLocation();
    useEffect(() => {
        location.pathname === "/search" ? setIsSearch(false) : setIsSearch(true);
        location.pathname === "/login" ? setIsLoginBtn(false) : setIsLoginBtn(true);
        location.pathname === "/register" ? setIsJoinBtn(false) : setIsJoinBtn(true);
    }, [location.pathname]);

    const navigate = useNavigate();
    const search = () => navigate("/search");
    const login = () => navigate("/login");
    const register = () => navigate("/register");

    return (
        <header className="h-20 w-full flex items-center px-11 justify-between">
            <Link className="text-black font-spartan font-semibold text-xl sm:text-3xl w-1/3" to="/">TalentStudio</Link>
            <DesktopNav onSearch={search} onLogin={login} onJoin={register} stateSearch={isSearch} stateLogin={isLoginBtn} stateJoin={isJoinBtn}/>
            <MobileNav onSearch={search} onLogin={login} onJoin={register} stateSearch={isSearch} stateLogin={isLoginBtn} stateJoin={isJoinBtn}/>
            
            {/* I will pass the state isLoggedIn from AuthProvider from the other branch, and this navbar will be displayed when needed*/}
            {/* <ProfileNav /> */}
        </header>
    );
};

export default Header;