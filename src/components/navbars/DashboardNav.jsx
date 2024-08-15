import Classes from '../../assets/icons/classes.png';
import Home from '../../assets/icons/home.png';
import Lesson from '../../assets/icons/lessons.png';
import Messages from '../../assets/icons/messages.png';
import { NavLink } from 'react-router-dom';
import Notification from '../../assets/icons/notification.png';
import Payment from '../../assets/icons/payment.png';
import Schedule from '../../assets/icons/schedule.png';
import Student from '../../assets/icons/student.png';
import { useAuth } from '../../AuthProvider';

const DashboardNav = () => {
  const { userData } = useAuth();

  const navbarItemsStudent = [
    { src: Home, text: 'Home', link: '' },
    { src: Lesson, text: 'My lessons', link: 'lessons' },
    { src: Notification, text: 'Notifications', link: 'notifications' },
    { src: Messages, text: 'Messages', link: 'messages' },
    { src: Payment, text: 'Payments', link: 'payments' },
  ];

  const navbarItemsTeacher = [
    { src: Home, text: 'Home', link: '' },
    { src: Classes, text: 'My classes', link: 'classes' },
    { src: Student, text: 'My students', link: 'students' },
    { src: Schedule, text: 'Schedule', link: 'schedule' },
    { src: Notification, text: 'Notifications', link: 'notifications' },
    { src: Messages, text: 'Messages', link: 'messages' },
  ];

  const currentNavbarContent =
    userData.role === 'teacher' ? navbarItemsTeacher : navbarItemsStudent;

  return (
    <nav className="h-16 md:h-24 w-full bg-lightGreen flex flex-wrap justify-evenly items-center">
      {currentNavbarContent.map(({ src, text, link }, index) => (
        <NavLink
          to={link}
          key={index}
          className={({ isActive }) =>
            isActive
              ? 'flex gap-2 font-spartan text-sm md:text-xl font-semibold border-b border-black'
              : 'flex gap-2 font-spartan text-sm md:text-xl font-medium border-b border-lightGreen opacity-60 hover:border-black hover:opacity-100'
          }
          end
        >
          <img className="h-3 md:h-5" src={src} alt={`${text} icon`} />
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardNav;