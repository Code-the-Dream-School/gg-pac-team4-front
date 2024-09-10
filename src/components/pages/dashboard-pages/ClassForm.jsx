import DeleteIcon from '../../../assets/icons/delete.png'
import FormInput from '../../common/FormInput';
import SelectDropdown from '../../common/SelectDropdown';
import subjectOptions from '../../../data/subjects';

const ClassForm = ({
  onChange,
  onHandleSubjects,
  category,
  onSubmit,
  formErrors,
  formData,
  onAddTime,
  onRemoveTime,
  onReturn
}) => {
  const options = subjectOptions;
  
  return (
    <div className="w-full flex flex-col items-center p-4">
      {formErrors.form && (
        <p className="text-red font-spartan">{formErrors.form}</p>
      )}
      <form className="flex flex-col w-3/4" onSubmit={onSubmit}>
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="lg:w-1/2">
            {formErrors.classTitle && (
              <p className="text-red text-sm font-spartan">
                {formErrors.classTitle}
              </p>
            )}
            <FormInput
              placeholder=" "
              name="classTitle"
              onChange={onChange}
              min="2"
              max="100"
              value={formData.classTitle}
            >
              Class name
            </FormInput>
            {formErrors.category && (
              <p className="text-red text-sm font-spartan">
                {formErrors.category}
              </p>
            )}
            <SelectDropdown
              options={options}
              multiple={false}
              placeholder="Select the category of the class"
              onChange={onHandleSubjects}
              value={category || formData.category}
            />
            {formErrors.description && (
              <p className="text-red text-sm font-spartan">
                {formErrors.description}
              </p>
            )}
            <label htmlFor="classDescription" className="hidden ">
              Class Description
            </label>
            <textarea
              id="classDescription"
              aria-label="Class description"
              className="mt-4 mb-2 p-2 w-full h-24 text-sm placeholder:text-darkGray text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
              placeholder="Class description"
              name="description"
              onChange={onChange}
              min="2"
              max="200"
              value={formData.description}
            />
            <FormInput type="file" onChange={onChange} name="classImage" />
            {formErrors.price && (
              <p className="text-red text-sm font-spartan">
                {formErrors.price}
              </p>
            )}
            <FormInput
              type="number"
              placeholder=" "
              name="price"
              onChange={onChange}
              min="0"
              value={formData.price}
            >
              Price per session
            </FormInput>
            {formErrors.duration && (
              <p className="text-red text-sm font-spartan">
                {formErrors.duration}
              </p>
            )}
            <FormInput
              type="number"
              placeholder=" "
              name="duration"
              onChange={onChange}
              min="0"
              value={formData.duration}
            >
              Lesson duration
            </FormInput>
            {formErrors.maxAge && (
              <p className="text-red text-sm font-spartan">
                {formErrors.maxAge}
              </p>
            )}
            {formErrors.minAge && (
              <p className="text-red text-sm font-spartan">
                {formErrors.minAge}
              </p>
            )}
            <div className="flex gap-6">
              <p className="w-full">Specify required student age:</p>
              <FormInput
                type="number"
                placeholder=" "
                min="0"
                name="minAge"
                onChange={onChange}
                value={formData.ages.minAge}
              >
                Minimum
              </FormInput>
              <FormInput
                type="number"
                placeholder=" "
                min="1"
                name="maxAge"
                onChange={onChange}
                value={formData.ages.maxAge}
              >
                Maximum
              </FormInput>
            </div>
          </div>
          <div className="lg:w-1/2">
            {formErrors.type && (
              <p className="text-red text-sm font-spartan">{formErrors.type}</p>
            )}
            <div className="flex gap-4">
              <p className="w-2/5">Select the type of the class:</p>
              <div className="w-1/2 flex gap-8">
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="type"
                    value="online"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    onChange={onChange}
                    checked={formData.type === 'online'}
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
                    checked={formData.type === 'offline'}
                  />
                  Offline
                </label>
              </div>
            </div>
            {formErrors.lessonType && (
              <p className="text-red text-sm font-spartan">
                {formErrors.lessonType}
              </p>
            )}
            <div className="flex gap-4 my-4">
              <p className="w-2/5">Select the type of the lesson:</p>
              <div className="w-1/2 flex gap-8">
                <label className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="lessonType"
                    value="Group"
                    className="w-4 h-4 accent-lightGreen focus:darkGreen"
                    onChange={onChange}
                    checked={formData.lessonType === 'Group'}
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
                    checked={formData.lessonType === '1:1'}
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
              max="200"
              value={formData.goal}
            >
              Learning goals of the class
            </FormInput>
            <FormInput
              type="text"
              placeholder=""
              name="experience"
              onChange={onChange}
              max="200"
              value={formData.experience}
            >
              Class experience
            </FormInput>
            <FormInput
              type="text"
              placeholder=""
              name="other"
              onChange={onChange}
              max="200"
              value={formData.other}
            >
              Other details
            </FormInput>
            {formErrors.availableTime && (
              <p className="text-red text-sm font-spartan">{formErrors.availableTime}</p>
            )}
            <div className="flex gap-4 flex-col">
              <p className="w-full">Select your availability for this class:</p>
              {formData.availableTime.map((time, index) => (
                <div key={index} className="flex gap-4">
                  <FormInput
                    type="date"
                    name="date"
                    onChange={(e) => onChange(e, index)}
                    value={time.date}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <FormInput
                    type="time"
                    name="startTime"
                    onChange={(e) => onChange(e, index)}
                    value={time.startTime}
                  />
                  <button 
                    type="button"
                    aria-label='delete date and time'
                    onClick={() => onRemoveTime(index)}
                    className='flex items-center justify-center h-10 w-10 transform hover:scale-125 transition-all duration-200'>
                      <img src={DeleteIcon} alt="delete icon" className='h-5 w-5 hover:scale-1.2'/>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mb-4 bg-pureWhite text-darkGreen border-2 border-darkGreen font-semibold p-2 rounded-lg w-1/2 self-center hover:bg-white"
                onClick={onAddTime}
              >
                Add more available time
              </button>
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
          <button
            type="button"
            onClick={onReturn}
            className="w-1/4 bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm;
