const FormInput = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  children,
  min, 
  max
}) => {
  return (
    <div className="relative w-full mb-4">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`block py-2 px-4 w-full text-base text-black rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${disabled ? 'bg-lightGray' : 'bg-pureWhite'}`}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] ${disabled ? 'bg-lightGray text-darkGray' : 'bg-pureWhite text-darkGray'} px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
      >
        {children}
      </label>
    </div>
  );
};

export default FormInput;
