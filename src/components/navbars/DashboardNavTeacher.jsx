import Classes from '../../assets/icons/classes.png';
import Home from '../../assets/icons/home.png';
import Messages from '../../assets/icons/messages.png';
import { NavLink } from 'react-router-dom';
import Notification from '../../assets/icons/notification.png';
import Schedule from '../../assets/icons/schedule.png';
import Student from '../../assets/icons/student.png';

const DashboardNavTeacher = () => {
  const navbarItemsTeacher = [
    { src: Home, text: 'Home', link: 'profile' },
    { src: Classes, text: 'My classes', link: 'teacher-classes' },
    { src: Student, text: 'My students', link: 'teacher-students' },
    { src: Schedule, text: 'Schedule', link: 'teacher-schedule' },
    { src: Notification, text: 'Notifications', link: 'notifications' },
    { src: Messages, text: 'Messages', link: 'messages' },
  ];

  return (
    <>
      {navbarItemsTeacher.map(({ src, text, link }, index) => (
        <NavLink
          to={link}
          key={index}
          className={({ isActive }) =>
            isActive
              ? 'flex gap-2 font-spartan text-sm md:text-xl font-medium border-b border-black'
              : 'flex gap-2 font-spartan text-sm md:text-xl font-medium border-b border-lightGreen opacity-25'
          }
        >
          <img className="h-3 md:h-5" src={src} alt={`${text} icon`} />
          {text}
        </NavLink>
      ))}
    </>
  );
};

export default DashboardNavTeacher;
