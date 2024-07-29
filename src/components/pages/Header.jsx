import { Link, useNavigate } from "react-router-dom";

import loginIcon from '../../assets/icons/login.png';
import searchIcon from '../../assets/icons/search.png';

const Header = () => {
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
        <header className="h-[80px] w-full flex items-center px-11 justify-between">
            <Link className="text-black font-spartan font-semibold text-xl sm:text-3xl w-1/3">TalentStudio</Link>
            
                <div className="w-2/3 hidden relative py-6 sm:flex justify-between">
                    <form className="border-2 border-red rounded-full h-10 w-1/3 flex justify-between items-center px-4 ml-6">
                        <input className="focus:outline-none w-2/3" />
                        <button onClick={search}><img src={searchIcon} className="h-[24px]" /></button>
                    </form>
                    <div className="flex gap-4 items-center">
                        <button className="font-spartan font-semibold text-base sm:text-lg flex items-center "
                            onClick={login}>
                            <img src={loginIcon} className="h-[15px] sm:h-[20px]" />
                            Log In
                        </button>
                        <button className='bg-red hover:bg-pureWhite hover:text-red w-16 h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in'
                            onClick={register}>Join
                        </button>
                    </div>
                </div>

            {/* 
            <form className="border-2 border-red rounded-full w-1/3 h-10 flex justify-between px-4">
                <input className="focus:outline-none hidden sm:block" placeholder="Search for classes..." />
                <button onClick={search}><img src={searchIcon} className="h-[15px] sm:h-[20px]" /></button>
            </form>
            <div className="flex gap-4">
                <button className="font-spartan font-semibold text-base sm:text-lg flex items-center "
                    onClick={login}>
                    <img src={loginIcon} className="h-[15px] sm:h-[20px]" />
                    Log In
                </button>
                <button className='bg-red hover:bg-pureWhite hover:text-red w-16 h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in'
                    onClick={register}>Join</button>
            </div> */}
        </header>
    );
};

export default Header;