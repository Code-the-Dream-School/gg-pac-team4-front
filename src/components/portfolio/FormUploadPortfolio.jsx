const FormUploadPortfolio = ({onSubmit, onChange, multiple}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center flex-col md:flex-row gap-4 m-2 w-3/4"
    >
      <input
        type="file"
        multiple={multiple}
        onChange={onChange}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-red hover:bg-pureWhite hover:text-red h-10 px-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg rounded-lg transition duration-300 easy-in w-1/3"
      >
        Upload
      </button>
    </form>
  );
};

export default FormUploadPortfolio;
