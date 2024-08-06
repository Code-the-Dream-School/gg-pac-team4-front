const FormSubmitBtn = ({
  value,
}) => {
  return (
    <input
      type="submit"
      value={value}
      className="w-full mb-4 py-1 rounded-lg bg-red border-2 border-red text-2xl text-white font-spartan font-semibold hover:bg-pureWhite hover:text-red"
    />
  );
};

export default FormSubmitBtn;
