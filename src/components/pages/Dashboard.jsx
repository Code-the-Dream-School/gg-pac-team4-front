import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardNav from "../navbars/DashboardNav";
import { Home } from "./dashboard-pages/index";
import { useAuth } from "../../AuthProvider";

const Dashboard = () => {
    const location = useLocation();
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const [error, setError] = useState({});
    const { userData } = useAuth();

    useEffect(()=>{
        console.log('use effect')
        setProfile(userData);
    },[userData])
    
    return (
        <div aria-label={userData.role === 'teacher' ? 'teacher dashboard' : 'student dashboard'} className="flex flex-col items-center w-full h-full bg-lightBlue">
            <DashboardNav/>
            {location.pathname==="/dashboard" ? <Home profile={profile} error={error}/> : <Outlet/>}
        </div>
    );
};

export default Dashboard;