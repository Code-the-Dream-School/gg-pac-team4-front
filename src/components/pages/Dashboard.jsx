import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

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
        const fetchUserProfileData = async () => {
        try {
            const result = await getUserData(userData._id, userData.token);
            if (result.status === 200) {
                console.log(result)
                setProfile(result.data)
                // setProfile({
                //     firstName: userProfile.data.firstName,
                //     lastName: userProfile.data.lastName,
                //     email: userProfile.data.email,
                //     dateOfBirth: userProfile.data.dateOfBirth || null,
                //     adultName: userProfile.data.adultName || null,
                //     role: userProfile.data.role,
                // });
                setError('');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('The profile is unavailable. Try again later please');
        }
    };
        fetchUserProfileData();
    },[]);

    console.log(profile);
    console.log(userData);

    return (
        <div className="flex flex-col items-center w-full h-full bg-lightBlue">
            <DashboardNav/>
            {location.pathname==="/dashboard" ? <Home profile={profile}/> : <Outlet/>}
        </div>
    );
};

export default Dashboard;