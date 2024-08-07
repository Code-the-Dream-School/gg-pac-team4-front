import { logout } from "../../util/DataBaseRequests";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-red font-bold text-2xl sm:text-4xl font-spartan uppercase">Dashboard Page</h1>
            <h2>Welcome.</h2>
        </div>
    );
};

export default Dashboard;