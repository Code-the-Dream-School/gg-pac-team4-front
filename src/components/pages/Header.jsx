import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import closeIcon from '../../assets/icons/close.png';
import loginIcon from '../../assets/icons/login.png';
import logoutIcon from '../../assets/icons/logout.png';
import navIcon from '../../assets/icons/nav.png';
import searchIcon from '../../assets/icons/search.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/search") {
            document.querySelector('form').style.visibility = "hidden";
        } else{
            document.querySelector('form').style.visibility = "visible";
        }
        
        if(location.pathname === "/login") {
            document.querySelector('#btnLogin').style.visibility = "hidden";
        } else {
            document.querySelector('#btnLogin').style.visibility = "visible";
        }
        
        if(location.pathname === "/register") {
            document.querySelector('#btnJoin').style.display = "none";
        } else {
            document.querySelector('#btnJoin').style.display = "block";
        }
    }, [location.pathname]);

    const navigate = useNavigate();
    const search = () => {
        navigate("/search");
    };
    const login = () => {
        navigate("/login");
    };
    const register = () => {
        navigate("/register");
    };

    return (
        <header className="h-20 w-full flex items-center px-11 justify-between">
            <Link className="text-black font-spartan font-semibold text-xl sm:text-3xl w-1/3" to="/">TalentStudio</Link>
            {}
            {/* Nav for the big screens */}
            <nav className="w-2/3 hidden relative py-6 sm:flex justify-between">
                <form className="border-2 border-red rounded-full h-10 w-2/4 flex justify-between items-center px-4 ml-6 gap-1">
                    <input className='focus:outline-none w-2/3' placeholder="Search online classes or teachers..." />
                    <button onClick={search}><img src={searchIcon} className="h-6" /></button>
                </form>
                <div id="mainNav" className="flex gap-4 items-center">
                    <button id="btnLogin" className="font-spartan font-semibold text-base sm:text-lg flex items-center "
                        onClick={login}>
                        <img src={loginIcon} className="h-4 sm:h-5" />
                        Log In
                    </button>
                    <button id="btnJoin" className='bg-red hover:bg-pureWhite hover:text-red w-16 h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in'
                        onClick={register}>Join
                    </button>
                </div>
            </nav>

            {/* Nav for the small screens */}
            {/* <MobNav /> */}
            <nav className="sm:hidden relative flex flex-row my-4 gap-2">
                <button onClick={search}><img src={searchIcon} className="h-[24px]" /></button>
                <button onClick={handleToggle}>{isOpen ? <img src={closeIcon} className="h-[24px]" /> : <img src={navIcon} className="h-[24px]" />}</button>
                <ul className={
                    isOpen
                        ? 'absolute right-0 top-10 w-[70px] flex flex-col items-end gap-1'
                        : 'ease-in-out w-3/5 duration-500 fixed top-0 bottom-0 -left-full'
                }>
                    <li className="hover:font-semibold hover:underline"><Link to="/login">Log In</Link></li>
                    <li className="hover:font-semibold hover:underline"><Link to="/register">Join</Link></li>
                </ul>
            </nav>

            {/* Nav for the account*/}
            {/* currently there is no route for it*/}
            {/* <nav className="sm:hidden relative flex flex-row my-4 gap-2 items-center">
                <div id="user-photo" className="h-[40px] w-[40px] rounded-full bg-lightGreen"></div>
                <p className="font-spartan text-lg font-semibold">User name</p>
                <Link to="/"><img src={logoutIcon} className="h-[24px]" /></Link>
            </nav> */}
        </header>
    );
};

export default Header;