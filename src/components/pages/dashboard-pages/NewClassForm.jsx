import FormInput from '../../common/FormInput';
import SelectDropdown from '../../common/SelectDropdown';
import subjectOptions from '../../../data/subjects';

const TeacherNewClassForm = () => {
  const options = subjectOptions;
  // this is a layout
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-black font-semibold text-xl sm:text-2xl font-spartan mb-4">
        Add a new class
      </h1>
      <form className="flex flex-col w-3/4 ">
        <div className='flex sm:flex-row flex-col gap-8'>
          <div className='sm:w-1/2'>
            <FormInput placeholder=" " name="className">
              Class name
            </FormInput>
            <SelectDropdown
              options={options}
              multiple={false}
              placeholder="Select the category of the class"
            />
            <label htmlFor="classDescription" className="hidden ">
              Class Description
            </label>
            <textarea
              id="classDescription"
              aria-label="Class description"
              className="mt-4 mb-2 p-2 w-full h-24 text-sm placeholder:text-xs placeholder:text-grey text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
              placeholder="Class description"
            />
            <FormInput type="file" name="downloadFile" />
            <FormInput type="number" placeholder=" " name="price">
              Price per session
            </FormInput>
            <FormInput type="number" placeholder=" " name="duration">
              Lesson duration
            </FormInput>
          </div>
          <div className='sm:w-1/2'>
            <div className="flex gap-6">
              <p className="w-full">Specify required student age:</p>
              <FormInput type="number" placeholder=" " min="1" name="ageMin">
                Minimum
              </FormInput>
              <FormInput type="number" placeholder=" " min="1" name="ageMax">
                Maximum
              </FormInput>
            </div>
            <div className="flex gap-10 my-4">
              <p className="">Select the type of the class:</p>
              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="typeClass"
                  value="online"
                  className="w-4 h-4 accent-lightGreen focus:darkGreen"
                  defaultChecked
                />
                Online
              </label>
              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="typeClass"
                  value="offline"
                  className="w-4 h-4 accent-lightGreen focus:darkGreen"
                />
                Offline
              </label>
            </div>
            <FormInput type="text" placeholder="" name="goal">
              Learning goals of the class
            </FormInput>
            <FormInput type="text" placeholder="" name="studentExpirience">
              Required student experience for this class
            </FormInput>
            <FormInput type="text" placeholder="" name="details">
              Other details
            </FormInput>
            <div className="flex gap-4 lg:flex-row flex-col">
              <p className="w-full">Select your availability for this class:</p>
              <FormInput type="date" name="date" />
              <FormInput type="time" name="time" />
            </div>
          </div>{' '}
        </div>
        <div className="col-span-2 flex gap-8 justify-center">
          <button
            type="submit"
            className="bg-darkGreen w-1/4 hover:bg-pureWhite hover:text-darkGreen hover:border-2 hover:border-darkGreen text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
          >
            Save
          </button>
          <button className="w-1/4 bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherNewClassForm;