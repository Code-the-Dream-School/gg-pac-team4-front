import Classes from "../../assets/icons/classes.png";
import Home from "../../assets/icons/home.png";
import Lesson from "../../assets/icons/lessons.png";
import Messages from "../../assets/icons/messages.png";
import { NavLink } from "react-router-dom";
import Notification from "../../assets/icons/notification.png";
import Payment from "../../assets/icons/payment.png";
import Schedule from "../../assets/icons/schedule.png";
import Student from "../../assets/icons/student.png";

const DashboardNav = () => {
    const navbarItemsTeacher = [
        { src: Home, text: "Home", link: "" },
        { src: Classes, text: "My classes", link: "teacher-classes" },
        { src: Student, text: "My students", link: "teacher-students" },
        { src: Schedule, text: "Schedule", link: "teacher-schedule" },
        { src: Notification, text: "Notifications", link: "notifications" },
        { src: Messages, text: "Messages", link: "messages" },
    ];

    const navbarItemsStudent = [
        { text: "Home", link: "" },
        { text: "My lessons", link: "student-lessons" },
        { text: "Notifications", link: "notifications" },
        { text: "Messages", link: "messages" },
        { text: "Payments", link: "student-payments" },
    ];
    
    const navbarTeacher = navbarItemsTeacher.map(({src, text, link}, index) => {
        return(
            <NavLink to={link} key={index} className={({ isActive }) => 
                isActive 
                    ? "flex gap-2 font-spartan text-xl font-medium border-b border-black" 
                    : "flex gap-2 font-spartan text-xl font-medium border-b border-lightGreen opacity-25"
               }>
                <img className="h-5" src={src} alt={text}/>
                {text}
            </NavLink>
        );
    });

//     <NavLink to={link} key={index} className="flex gap-2 font-spartan text-xl font-medium">
//     <img className="h-5" src={src}/>
//     {text}
// </NavLink>

    const navbarStudent = navbarItemsStudent.map(({text, link}, index) => {
        return(
            <NavLink to={link} key={index}>{text}</NavLink>
        );
    });
    
    return (
        <div className="h-24 w-full bg-lightGreen flex flex-wrap justify-evenly items-center">
            {navbarTeacher}
            {/* {navbarStudent} */}
        </div>
    )
};

export default DashboardNav;