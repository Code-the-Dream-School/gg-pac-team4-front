import FormInput from '../../common/FormInput';
import SelectDropdown from '../../common/SelectDropdown';
import subjectOptions from '../../../data/subjects';

const ClassForm = ({ onChange, onHandleSubjects, category, onSubmit}) => {
  const options = subjectOptions;
  // this is a layout
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-black font-semibold text-xl sm:text-2xl font-spartan mb-4">
        Add a new class
      </h1>
      <form className="flex flex-col w-3/4" onSubmit={onSubmit}>
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="lg:w-1/2">
            <FormInput placeholder=" " name="classTitle" onChange={onChange}>
              Class name
            </FormInput>
            <SelectDropdown
              options={options}
              multiple={false}
              placeholder="Select the category of the class"
              onChange={onHandleSubjects}
              value={category}
            />
            <label htmlFor="classDescription" className="hidden ">
              Class Description
            </label>
            <textarea
              id="classDescription"
              aria-label="Class description"
              className="mt-4 mb-2 p-2 w-full h-24 text-sm placeholder:text-xs placeholder:text-grey text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
              placeholder="Class description"
              name="description"
              onChange={onChange}
            />
            <FormInput type="file" onChange={onChange} name="classImage" />
            <FormInput
              type="number"
              placeholder=" "
              name="price"
              onChange={onChange}
            >
              Price per session
            </FormInput>
            <FormInput
              type="number"
              placeholder=" "
              name="duration"
              onChange={onChange}
            >
              Lesson duration
            </FormInput>
          </div>
          <div className="lg:w-1/2">
            <div className="flex gap-6">
              <p className="w-full">Specify required student age:</p>
              <FormInput
                type="number"
                placeholder=" "
                min="1"
                name='minAge'
                onChange={onChange}
              >
                Minimum
              </FormInput>
              <FormInput
                type="number"
                placeholder=" "
                min="1"
                name="maxAge"
                onChange={onChange}
              >
                Maximum
              </FormInput>
            </div>
            <div className="flex gap-4 my-4">
              <p className="w-2/5">Select the type of the class:</p>
              <div className="w-1/2 flex justify-around">
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="type"
                    value="online"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    //defaultChecked
                    onChange={onChange}
                  />
                  Online
                </label>
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="type"
                    value="offline"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    onChange={onChange}
                  />
                  Offline
                </label>
              </div>
            </div>
            <div className="flex gap-4 my-4">
              <p className="w-2/5">Select the type of the lesson:</p>
              <div className="w-1/2 flex justify-around">
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="lessonType"
                    value="Group"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    //defaultChecked
                    onChange={onChange}
                  />
                  Group
                </label>
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="lessonType"
                    value="1:1"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    onChange={onChange}
                  />
                  1:1
                </label>
              </div>
            </div>
            <FormInput
              type="text"
              placeholder=""
              name="goal"
              onChange={onChange}
            >
              Learning goals of the class
            </FormInput>
            <FormInput
              type="text"
              placeholder=""
              name="experience"
              onChange={onChange}
            >
              Required student experience for this class
            </FormInput>
            <FormInput
              type="text"
              placeholder=""
              name="other"
              onChange={onChange}
            >
              Other details
            </FormInput>
            <div className="flex gap-4 lg:flex-row flex-col">
              <p className="w-full">Select your availability for this class:</p>
              <FormInput type="date" name="date" onChange={onChange} />
              <FormInput type="time" name="startTime" onChange={onChange} />
            </div>
          </div>
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

export default ClassForm;