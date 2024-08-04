import { logout } from "../../util/DataBaseRequests";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
    // temporarily this functionality is here, then it will be moved to the header
    const [logoutError, setLogoutError] = useState(false);
    const { logoutUser, userData } = useAuth();
    
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result.status === 200){
                logoutUser();
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setLogoutError(true);
        }

    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-red font-bold text-2xl sm:text-4xl font-spartan uppercase">Dashboard Page</h1>
            <h2>Welcome, {userData.role} {userData.firstName} {userData.lastName.slice(0,1)}.</h2>
            {logoutError && <p>Something went wrong. You're still logged in.</p>}
            <button className="border-b border-black" onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default Dashboard;