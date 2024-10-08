import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import DesktopNav from '../navbars/DesktopNav';
import MobileNav from '../navbars/MobileNav';

const Header = () => {
  const [isSearch, setIsSearch] = useState(true);
  const [isLoginBtn, setIsLoginBtn] = useState(true);
  const [isJoinBtn, setIsJoinBtn] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      // Clear all query parameters when the user is on the main page
      navigate('/', { replace: true });
    }
    location.pathname === '/search' ? setIsSearch(false) : setIsSearch(true);
    location.pathname === '/login' ? setIsLoginBtn(false) : setIsLoginBtn(true);
    location.pathname === '/register'
      ? setIsJoinBtn(false)
      : setIsJoinBtn(true);
  }, [location.pathname, navigate]);

  const search = () => navigate('/search');
  const login = () => navigate('/login');
  const register = () => navigate('/register');

  return (
    <header className="h-20 w-full flex items-center px-4 lg:px-16 xl:px-14 2xl:px-20 justify-between">
      <Link
        className="text-black font-spartan font-semibold text-xl sm:text-3xl w-1/3"
        to="/"
      >
        TalentStudio
      </Link>
      <DesktopNav
        onSearch={search}
        onLogin={login}
        onJoin={register}
        isSearch={isSearch}
        isLogin={isLoginBtn}
        isJoin={isJoinBtn}
      />
      <MobileNav
        onSearch={search}
        onLogin={login}
        onJoin={register}
        isSearch={isSearch}
        isLogin={isLoginBtn}
        isJoin={isJoinBtn}
      />
    </header>
  );
};

export default Header;
