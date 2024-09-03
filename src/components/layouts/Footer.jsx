import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="flex items-center text-center justify-between bg-lightGreen h-16 text-black shrink-0 px-4 lg:px-16 xl:px-14 2xl:px-20">
      <p>&copy; TalentStudio</p>
      <p>Designed and developed by Team 4 for Code the Dream</p>
      <Link to="/team">Meet the Team</Link>
    </footer>
  );
};

export default Footer;
