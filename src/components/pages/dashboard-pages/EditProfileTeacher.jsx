import FormInput from "../../common/FormInput";

const EditProfileTeacher = () => {
    // just layout
  return (
    <div className="w-full flex justify-center md:flex-row flex-col">
      <div className="w-1/5 flex flex-col items-center gap-4 mt-4 p-4">
        {/* div for user's photo */}
        <div className="h-24 w-24 bg-grey rounded-full"></div>
        <button className="bg-red hover:bg-pureWhite hover:text-red h-8 w-full md:w-3/5 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in">
          Add Photo
        </button>
      </div>
      <form className="mt-4 p-4 w-2/5">
        <div className="flex gap-8">
            <FormInput placeholder=" ">First name</FormInput>
            <FormInput placeholder=" ">Last name</FormInput>
        </div>
        <FormInput placeholder=" ">Email</FormInput>
        <FormInput placeholder=" ">Education & Experience</FormInput>
        <FormInput/>
        <textarea className="py-2 px-4 w-full text-sm text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black" placeholder="Tell more about yourself"/>
        <div className="flex gap-8 mt-2">
            <button type="submit" className="bg-darkGreen w-full hover:bg-pureWhite hover:text-darkGreen hover:border-2 hover:border-darkGreen text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">Save</button>
            <button className="w-full bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">Cancel</button>
        </div>
        
      </form>
    </div>
  );
};

export default EditProfileTeacher;
