import React from 'react';
import iconsArrowDown from '../../assets/icons/icon.svg';
import iconsSort from '../../assets/icons/icon-sort.svg';
//filter functionality will work later
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
    <div className="flex flex-row justify-around items-center pb-6 bg-lightGreen w-full">
      {buttons.map(({ label, icon }) => (
        <button
          key={label}
          className="bg-pureWhite rounded-lg font-roboto text-black text-xl p-2 flex items-center"
        >
          <span>{label}</span>
          <img src={icon} className="h-6 mx-3" alt={`${label} icon`} />
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
