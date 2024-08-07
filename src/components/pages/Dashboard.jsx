import { Outlet, useLocation } from "react-router-dom";

import DashboardNav from "../navbars/DashboardNav";
import { Home } from "./dashboard-pages/index";

const Dashboard = () => {
    const location = useLocation();
    
    return (
        <div className="flex flex-col items-center w-full">
            <DashboardNav/>
            {location.pathname==="/dashboard" ? <Home/> : <Outlet/>}
        </div>
    );
};

export default Dashboard;