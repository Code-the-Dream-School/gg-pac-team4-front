import FormInput from '../../common/FormInput';
import SelectDropdown from '../../common/SelectDropdown';

const EditProfileForm = ({
  options,
  role,
  cancel,
  formData,
  onChange,
  onSetSubjects,
  selectValue,
  onSubmit,
  formErrors
}) => {
  return (
    <div className="w-full h-full md:h-screen flex flex-grow items-center sm:items-start sm:justify-center sm:flex-row flex-col overflow-y-hidden">
      <div className="sm:w-1/5 w-4/5 flex flex-col items-center gap-4 mt-4 p-4">
        {/* div for user's photo */}
        <div className="h-24 w-24 bg-grey rounded-full"></div>
        <button className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/3 sm:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-lg rounded-lg transition duration-300 easy-in">
          Add Photo
        </button>
      </div>
      <form className="mt-4 p-4 sm:w-2/5 w-4/5 h-full" onSubmit={onSubmit}>
        {formErrors.firstName && <p className="text-red text-sm font-spartan">{formErrors.firstName}</p>}
        {formErrors.lastName && <p className="text-red text-sm font-spartan">{formErrors.lastName}</p>}
        {formErrors.form && <p className="text-red text-sm font-spartan">{formErrors.form}</p>}
        <div className="flex gap-8">
          <FormInput
            placeholder=" "
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          >
            First name
          </FormInput>
          <FormInput
            placeholder=" "
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          >
            Last name
          </FormInput>
        </div>
        {formErrors.email && <p className="text-red text-sm font-spartan">{formErrors.email}</p>}
        <FormInput
          placeholder=" "
          name="email"
          value={formData.email}
          onChange={onChange}
        >
          Email
        </FormInput>
        {role === 'teacher' && (
          <FormInput
            placeholder=" "
            name="education"
            value={formData.education}
            onChange={onChange}
          >
            Education
          </FormInput>
        )}
        {role === 'teacher' && (
          <FormInput
            placeholder=" "
            name="experience"
            value={formData.experience}
            onChange={onChange}
          >
            Experience
          </FormInput>
        )}
        <SelectDropdown
          options={options}
          multiple={true}
          placeholder={
            role === 'teacher'
              ? 'Select your specialty'
              : 'Select subjects you are interested in'
          }
          onChange={onSetSubjects}
          value={selectValue}
        />
        <label htmlFor="about" className="hidden">
          About yourself
        </label>
        <textarea
          id="about"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={onChange}
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
          <button
            onClick={cancel}
            className="w-full bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;