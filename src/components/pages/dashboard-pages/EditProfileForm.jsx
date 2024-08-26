import FormInput from '../../common/FormInput';
import SelectDropdown from '../../common/SelectDropdown';

const EditProfileForm = ({
  options,
  role,
  cancel,
  formData,
  onChange,
  onHandleSubjects,
  category,
  onSubmit,
  formErrors,
  userPhotoSrc,
  onPhotoChange,
  onPhotoSubmit,
  isUpload,
  setIsUpload,
}) => {
  return (
    <div className="w-full h-full flex flex-grow items-center sm:items-start sm:justify-center sm:flex-row flex-col overflow-y-hidden">
      <div className="sm:w-1/4 w-4/5 flex flex-col items-center gap-4 mt-4 p-4">
        <img
          className="h-24 w-24 rounded-full object-cover"
          src={userPhotoSrc}
          alt="user photo"
        />
        {!isUpload && (
          <button
            className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/3 sm:w-3/4 md:w-1/2 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in"
            onClick={() => setIsUpload(!isUpload)}
          >
            Add Photo
          </button>
        )}
        {isUpload && (
          <>
            <form
              onSubmit={onPhotoSubmit}
              className="flex flex-col items-center"
            >
              <FormInput type="file" onChange={onPhotoChange} />
              <button
                type="submit"
                className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/2 sm:w-3/4 md:w-1/2 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in"
              >
                Upload
              </button>
            </form>
          </>
        )}
      </div>
      <form className="mt-4 p-4 sm:w-2/5 w-4/5 h-full" onSubmit={onSubmit}>
        {formErrors.firstName && (
          <p className="text-red text-sm font-spartan">
            {formErrors.firstName}
          </p>
        )}
        {formErrors.lastName && (
          <p className="text-red text-sm font-spartan">{formErrors.lastName}</p>
        )}
        {formErrors.form && (
          <p className="text-red text-sm font-spartan">{formErrors.form}</p>
        )}
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
        {formErrors.email && (
          <p className="text-red text-sm font-spartan">{formErrors.email}</p>
        )}
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
          onChange={onHandleSubjects}
          value={category}
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
            className={`w-full text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in ${!isUpload ? 'bg-darkGreen hover:bg-pureWhite hover:text-darkGreen hover:border-2 hover:border-darkGreen ' : 'bg-lightGreen cursor-not-allowed'}`}
            disabled={isUpload}
          >
            {/* {`w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg ${email ? 'bg-darkGreen hover:bg-darkGreen-darker' : 'bg-lightGreen cursor-not-allowed'}`} */}
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