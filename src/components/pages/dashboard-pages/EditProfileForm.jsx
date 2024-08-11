import FormInput from '../../common/FormInput';
import MultiSelectDropdown from '../../common/MultiSelectDropdown';

const EditProfileForm = ({ options, role, cancel }) => {
  // this is just a layout without sending the data to DB and storing the state
  return (
    <div className="w-full flex flex-grow items-center sm:items-start sm:justify-center sm:flex-row flex-col overflow-y-hidden">
      <div className="sm:w-1/5 w-4/5 flex flex-col items-center gap-4 mt-4 p-4">
        {/* div for user's photo */}
        <div className="h-24 w-24 bg-grey rounded-full"></div>
        <button className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/3 sm:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in">
          Add Photo
        </button>
      </div>
      <form className="mt-4 p-4 sm:w-2/5 w-4/5 h-full">
        <div className="flex gap-8">
          <FormInput placeholder=" ">First name</FormInput>
          <FormInput placeholder=" ">Last name</FormInput>
        </div>
        <FormInput placeholder=" ">Email</FormInput>
        { 
          role === 'teacher' 
          ? <FormInput placeholder=" ">Education & Experience</FormInput>
          : <></>
          }
        <MultiSelectDropdown
          options={options}
          placeholder={role === 'teacher' ? "Select your specialty" : "Select subjects you are interested in"}
        />
        <textarea
          aria-label="Tell more about yourself"
          className="mt-4 p-2 w-full text-sm placeholder:text-xs placeholder:text-grey text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
          placeholder="Tell more about yourself"
        />
        <div className="flex gap-8 mt-2">
          <button
            type="submit"
            className="bg-darkGreen w-full hover:bg-pureWhite hover:text-darkGreen hover:border-2 hover:border-darkGreen text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
          >
            Save
          </button>
          <button onClick={cancel} className="w-full bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
