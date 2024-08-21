import Select from 'react-tailwindcss-select';

const SelectDropdown = ({ options, placeholder,multiple, onChange, value}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      options={options}
      isMultiple={multiple}
      classNames={{
        menuButton: ({ isDisabled }) =>
          `flex text-xs text-grey border-2 border-grey rounded transition-all duration-300 focus:outline-none ${
            isDisabled
              ? 'bg-white'
              : 'bg-pureWhite hover:border-gray-400 focus:border-darkGreen focus:ring focus:ring-darkGreen/20'
          }`,
        menu: 'absolute z-20 w-full bg-white shadow-lg border-2 rounded py-1 mt-1.5 text-sm text-grey',
        listItem: ({ isSelected }) =>
          `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
            isSelected
              ? `text-white bg-darkGreen`
              : `text-black hover:bg-lightGreen hover:text-white`
          }`,
      }}
    />
  );
};

export default SelectDropdown;