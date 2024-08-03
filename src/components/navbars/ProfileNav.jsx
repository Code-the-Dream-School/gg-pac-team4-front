import { Link } from "react-router-dom";
import logoutIcon from '../../assets/icons/logout.png';

const ProfileNav = () => {
    return(
            <nav className="sm:hidden relative flex flex-row my-4 gap-2 items-center">
                <div id="user-photo" className="h-10 w-10 rounded-full bg-lightGreen"></div>
                <p className="font-spartan text-lg font-semibold">User name</p>
                <Link to="/"><img src={logoutIcon} className="h-6" /></Link>
            </nav>
    )
};

export default ProfileNav;