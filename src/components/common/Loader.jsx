import React from 'react';
import LoaderBar from '../../assets/svg/loader-icon.svg?react'; // Import SVG as React component

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <LoaderBar className="w-32 h-32" />
      <span className="font-spartan text-2xl text-xlg">Loading...</span>
    </div>
  );
};

export default Loader;
