import { NavLink } from 'react-router-dom';
import navbarItemsStudent from '../../data/navbarStudent';
import navbarItemsTeacher from '../../data/navbarTeacher';
import { useAuth } from '../../AuthProvider';

const DashboardNav = () => {
  const { userData } = useAuth();

  const currentNavbarContent =
    userData.role === 'teacher' ? navbarItemsTeacher : navbarItemsStudent;

  return (
    <nav className="h-16 md:h-24 w-full bg-lightGreen flex flex-wrap justify-evenly items-center shrink-0">
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
