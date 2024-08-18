import React from 'react';
import iconsArrowDown from '../../assets/icons/icon.svg';
import iconsSort from '../../assets/icons/icon-sort.svg';
//filter functionality will work after backend will finalize their dependencies
const buttons = [
  { label: 'Specialties', filter: 'specialties', icon: iconsArrowDown },
  { label: 'Age', filter: 'age', icon: iconsArrowDown },
  { label: 'Lesson Type', filter: 'lessonType', icon: iconsArrowDown },
  { label: 'Price', filter: 'price', icon: iconsArrowDown },
  { label: "Teacher's Location", filter: 'location', icon: iconsArrowDown },
  { label: 'Sort by', filter: 'sortBy', icon: iconsSort },
];

const FilterButtons = () => {
  return (
    <div className="flex flex-wrap justify-around items-center px-4 pb-6 gap-4 bg-lightGreen w-full">
      {buttons.map(({ label, icon }) => (
        <button
          key={label}
          className="bg-pureWhite rounded-lg font-roboto text-black text-xl p-2 flex items-center w-auto"
        >
          <span>{label}</span>
          <img src={icon} className="h-6 mx-3" alt={`${label} icon`} />
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
