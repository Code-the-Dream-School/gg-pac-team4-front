import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Footer = () => {
  const location = useLocation();
  const [isTeamPage, setIsTeamPage] = useState(false);

  useEffect(() => {
    location.pathname === '/team' ? setIsTeamPage(true) : setIsTeamPage(false);
  }, [location.pathname]);

  return (
    <footer className="flex items-center text-center justify-between bg-lightGreen h-16 text-black shrink-0 px-4 lg:px-16 xl:px-14 2xl:px-20">
      <p>&copy; TalentStudio</p>
      <p>Designed and developed by Team 4 for Code the Dream</p>
      {isTeamPage ? (
        <p>The Team</p>
      ) : (
        <Link to="/team" className="hover:text-white hover:underline">
          The Team
        </Link>
      )}
    </footer>
  );
};

export default Footer;
