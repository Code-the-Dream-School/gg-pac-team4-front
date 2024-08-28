import { useState } from 'react';
import ProfileNav from './ProfileNav';
import loginIcon from '../../assets/icons/login.png';
import searchIcon from '../../assets/icons/search.png';
import { useAuth } from '../../AuthProvider';
import useSearch from '../search/UseSearch';

const DesktopNav = ({ onLogin, onJoin, isSearch, isLogin, isJoin }) => {
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { handleSearchSubmit } = useSearch(() => setSearchTerm(''));

  return (
    <nav
      aria-label="desktop navbar"
      className="w-2/3 hidden relative py-6 sm:flex justify-between items-center"
    >
      {isSearch ? (
        <form
          className="border-2 border-red rounded-full h-10 w-2/4 flex justify-between items-center px-4 ml-6 gap-1"
          onSubmit={(event) => handleSearchSubmit(event, searchTerm)}
        >
          <input
            className="focus:outline-none w-2/3"
            aria-label="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search classes or teachers..."
          />
          <button type="submit" aria-label="Search">
            <img src={searchIcon} className="h-6" alt="search icon" />
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <div id="mainNav" className="flex gap-4 items-center">
        {isLoggedIn ? (
          <ProfileNav />
        ) : (
          <>
            {isLogin && (
              <button
                onClick={onLogin}
                className="font-spartan font-semibold text-base sm:text-lg flex items-center"
              >
                <img src={loginIcon} className="h-4 sm:h-5" alt="join icon" />
                Log In
              </button>
            )}
            {isJoin && (
              <button
                onClick={onJoin}
                className="bg-red hover:bg-pureWhite hover:text-red w-16 h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in"
              >
                Join
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
