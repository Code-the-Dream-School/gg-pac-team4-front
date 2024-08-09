import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardNav from "../navbars/DashboardNav";
import { Home } from "./dashboard-pages/index";
import { getUserData } from "../../util/DataBaseRequests";
import { useAuth } from "../../AuthProvider";

const Dashboard = () => {
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const [error, setError] = useState('');
    const { userData } = useAuth();

    useEffect(() => {
        console.log('useeffect')
        const fetchUserProfileData = async () => {
        try {
            const result = await getUserData(userData._id, userData.token);
            if (result.status === 200) {
                setProfile({
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    email: result.data.email,
                    dateOfBirth: new Date(result.data.dateOfBirth).toLocaleString("en-US", { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })|| "",
                    adultName: result.data.adultName || "",
                    role: result.data.role,
                });
                setError('');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('The profile is unavailable. Try again later please');
        }
    };
        fetchUserProfileData();
    },[]);

    return (
        <div className="flex flex-col items-center w-full h-full bg-lightBlue">
            <DashboardNav/>
            {location.pathname==="/dashboard" ? <Home profile={profile}/> : <Outlet/>}
        </div>
    );
};

export default Dashboard;