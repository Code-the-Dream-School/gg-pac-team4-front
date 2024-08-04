const FormInput = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  children,
}) => {
  return (
    <>
      <div className="relative w-full mb-4">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="block py-2 px-4 w-full text-sm text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className="absolute text-xs text-grey duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-pureWhite px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {children}
        </label>
      </div>
    </>
  );
};

export default FormInput;
