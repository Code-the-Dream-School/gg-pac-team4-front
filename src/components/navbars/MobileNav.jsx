import joinIcon from '../../assets/icons/register.png';
import loginIcon from '../../assets/icons/login.png';
import searchIcon from '../../assets/icons/search.png';

const MobNav = ({onSearch, onLogin, onJoin, stateSearch, stateLogin, stateJoin}) => {
    return(
        <nav className="sm:hidden relative flex flex-row my-4 gap-2">
            { stateSearch && <button onClick={onSearch} aria-label="Search"><img src={searchIcon} className="h-6" alt="search icon"/></button> }
            { stateLogin && <button onClick={onLogin} aria-label="Login"><img src={loginIcon} className="h-6" alt="login icon"/></button> }
            { stateJoin && <button onClick={onJoin} aria-label="Join"><img src={joinIcon} className="h-6" alt="join icon"/></button> }
        </nav>
    )
};

export default MobNav;