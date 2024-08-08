import Home from '../../assets/icons/home.png';
import Lesson from '../../assets/icons/lessons.png';
import Messages from '../../assets/icons/messages.png';
import { NavLink } from 'react-router-dom';
import Notification from '../../assets/icons/notification.png';
import Payment from '../../assets/icons/payment.png';

const DashboardNavStudent = () => {
  const navbarItemsStudent = [
    { src: Home, text: 'Home', link: 'profile' },
    { src: Lesson, text: 'My lessons', link: 'lessons' },
    { src: Notification, text: 'Notifications', link: 'notifications' },
    { src: Messages, text: 'Messages', link: 'messages' },
    { src: Payment, text: 'Payments', link: 'payments' },
  ];

  return (
    <>
      {navbarItemsStudent.map(({ src, text, link }, index) => (
        <NavLink
          to={link}
          key={index}
          className={({ isActive }) =>
            isActive
              ? 'flex gap-2 font-spartan text-sm md:text-xl font-semibold border-b border-black'
              : 'flex gap-2 font-spartan text-sm md:text-xl font-medium border-b border-lightGreen opacity-70 hover:border-black'
          }
        >
          <img className="h-3 md:h-5" src={src} alt={`${text} icon`} />
          {text}
        </NavLink>
      ))}
    </>
  );
};

export default DashboardNavStudent;
