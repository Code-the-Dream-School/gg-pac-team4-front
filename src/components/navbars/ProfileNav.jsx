import { Link } from 'react-router-dom';
import { logout } from '../../util/DataBaseRequests';
import logoutIcon from '../../assets/icons/logout.png';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfileNav = () => {
  const [logoutError, setLogoutError] = useState({});
  const { clearUserSession, userData } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.status === 200) {
        clearUserSession();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setLogoutError({
        ...logoutError,
        message: `Something went wrong. You're still logged in.`,
      });
    }
  };
  return (
    <nav className="relative flex flex-row my-4 gap-2 items-center">
      <Link to="dashboard">
        <div id="user-photo" className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-lightGreen"></div>
      </Link>
      <Link to="dashboard">
        <p className="font-spartan text-sm md:text-lg font-semibold">
          {userData.firstName} {userData.lastName.slice(0, 1)}.
        </p>
      </Link>
      <button onClick={handleLogout} aria-label="Logout">
        <img src={logoutIcon} className="h-5 md:h-6" alt="logout icon" />
      </button>
      {/* need to create a modal later */}
      {logoutError.message && <p>{logoutError.message}</p>}
    </nav>
  );
};

export default ProfileNav;
