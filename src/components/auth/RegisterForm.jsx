import FormInput from '../common/FormInput';
import FormSubmitButton from '../common/FormSubmitButton';
import FormErrorMsg from '../common/FormErrorMsg';

const RegisterForm = ({
  onSubmit,
  userRole,
  switchUserRole,
  firstName,
  firstNameError,
  handleFirstNameChange,
  lastName,
  lastNameError,
  handleLastNameChange,
  dateOfBirth,
  dateOfBirthError,
  handleDateOfBirthChange,
  adultName,
  adultNameError,
  handleAdultNameChange,
  isAdultNameRequired,
  email,
  emailError,
  handleEmailChange,
  confirmEmail,
  confirmEmailError,
  handleConfirmEmailChange,
  password,
  passwordError,
  handlePasswordChange,
  confirmPassword,
  confirmPasswordError,
  handleConfirmPasswordChange
}) => {
  return (
    <>
      {userRole === 'student' ? (
        <div className="flex w-full font-spartan text-2xl text-grey text-center mb-5">
          <button className="basis-2/4 text-black border-b-[3px] border-black">as a Student</button>
          <button className="basis-2/4 border-b-[3px] border-grey" onClick={switchUserRole}>as a Teacher</button>
        </div>
      ) : (
        <div className="flex w-full font-spartan text-2xl text-grey text-center mb-5">
          <h2 className="basis-2/4 border-b-[3px] border-grey" onClick={switchUserRole}>as a Student</h2>
          <h2 className="basis-2/4 text-black border-b-[3px] border-black">as a Teacher</h2>
        </div>
      )}


      <form className="w-full px-2" onSubmit={onSubmit}>
        <div className="flex w-full gap-x-4 items-end">
          <div className="basis-2/4">
            {firstNameError && <FormErrorMsg error={firstNameError} />}
            <FormInput
              type="text"
              id="first-name"
              label="first-name"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder=" "
              className="basis-2/4">
              First Name
            </FormInput>
          </div>
          <div className="basis-2/4">
            {lastNameError && <FormErrorMsg error={lastNameError} />}
            <FormInput
              type="text"
              id="last-name"
              label="last-name"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder=" "
              className="basis-2/4">
              Last Name
            </FormInput>
          </div>
        </div>
        {userRole === 'student' && (
          <>
            <div className="flex w-full gap-x-4 items-end">
              <div className="basis-2/4">
                {dateOfBirthError && <FormErrorMsg error={dateOfBirthError} />}
                <FormInput
                  type="date"
                  id="dob"
                  label="dob"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  placeholder=" "
                >
                  Date of Birth
                </FormInput>
              </div>
              <div className="basis-2/4">
                {adultNameError && <FormErrorMsg error={adultNameError} />}
                <FormInput
                  type="text"
                  id="adult-name"
                  label="adult-name"
                  value={adultName}
                  onChange={handleAdultNameChange}
                  placeholder=" "
                  disabled={!isAdultNameRequired}>
                  Adult Full Name
                </FormInput>
              </div>
            </div>
          </>
        )}
        {emailError && <FormErrorMsg error={emailError} />}
        <FormInput
          type="email"
          id="email"
          label="email"
          value={email}
          onChange={handleEmailChange}
          placeholder=" ">
          Email Address
        </FormInput>
        {confirmEmailError && <FormErrorMsg error={confirmEmailError} />}
        <FormInput
          type="email"
          id="email2"
          label="email2"
          value={confirmEmail}
          onChange={handleConfirmEmailChange}
          placeholder=" ">
          Confirm Email Address
        </FormInput>
        {passwordError && <FormErrorMsg error={passwordError} />}
        <FormInput
          type="password"
          id="password"
          label="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder=" ">
          Password
        </FormInput>
        {confirmPasswordError && <FormErrorMsg error={confirmPasswordError} />}
        <FormInput
          type="password"
          id="password2"
          label="password2"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder=" ">
          Confirm Password
        </FormInput>
        <FormSubmitButton
          value={`Create ${userRole} account`}
        />
      </form>
    </>
  );
};

export default RegisterForm;