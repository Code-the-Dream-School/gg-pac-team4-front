import DashboardNavStudent from "./DashboardNavStudent";
import DashboardNavTeacher from "./DashboardNavTeacher";
import { useAuth } from "../../AuthProvider";

const DashboardNav = () => {
    const {userData} = useAuth();
    return (
        <nav className="h-16 md:h-24 w-full bg-lightGreen flex flex-wrap justify-evenly items-center">
            {userData.role === 'teacher' ? <DashboardNavTeacher/> : <DashboardNavStudent/>}
        </nav>
    )
};

export default DashboardNav;