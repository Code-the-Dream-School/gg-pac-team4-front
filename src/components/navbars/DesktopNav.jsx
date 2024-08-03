import loginIcon from '../../assets/icons/login.png';
import searchIcon from '../../assets/icons/search.png';

const DesktopNav = ({ onSearch, onLogin, onJoin, stateSearch, stateLogin, stateJoin }) => {
    return (
        <nav className="w-2/3 hidden relative py-6 sm:flex justify-between">
            {
                stateSearch
                    ? <form className="border-2 border-red rounded-full h-10 w-2/4 flex justify-between items-center px-4 ml-6 gap-1">
                        <input className='focus:outline-none w-2/3' placeholder="Search online classes or teachers..." />
                        <button onClick={onSearch}><img src={searchIcon} className="h-6" alt="search icon" /></button>
                    </form>
                    : <div></div>
            }
            <div id="mainNav" className="flex gap-4 items-center">
                {
                    stateLogin
                        ? <button onClick={onLogin} className="font-spartan font-semibold text-base sm:text-lg flex items-center">
                            <img src={loginIcon} className="h-4 sm:h-5" alt="join icon" />
                            Log In
                        </button>
                        : <div></div>
                }
                {
                    stateJoin
                        ? <button onClick={onJoin} className='bg-red hover:bg-pureWhite hover:text-red w-16 h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in'>
                            Join
                        </button>
                        : <div></div>
                }
            </div>
        </nav>)
};

export default DesktopNav;