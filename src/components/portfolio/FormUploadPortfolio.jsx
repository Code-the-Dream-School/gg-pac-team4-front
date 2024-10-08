import { useState } from "react";

const FormUploadPortfolio = ({onSubmit, onChange, multiple}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (e) => {
    onChange(e);
    setIsFileSelected(e.target.files.length > 0);
  };
  
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center flex-col md:flex-row gap-4 m-2 w-3/4"
    >
      <input
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-red hover:bg-pureWhite hover:text-red h-10 px-8 border-2 border-transparent hover:border-red text-white font-spartan font-semibold text-lg rounded-lg transition duration-300 ease-in w-1/3 min-w-28 disabled:opacity-65 disabled:cursor-not-allowed disabled:bg-red disabled:text-white"
        disabled={!isFileSelected}
      >
        Upload
      </button>
    </form>
  );
};

export default FormUploadPortfolio;
