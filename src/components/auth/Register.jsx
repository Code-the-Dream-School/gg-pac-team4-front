import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from "../common/FormInput";

const Register = () => {
  const [userRole, setUserRole] = useState('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isAdultNameRequired, setIsAdultNameRequired] = useState(false);
  const [adultName, setAdultName] = useState('');

  const handleUserRegistration = (event) => {
    event.preventDefault();
    console.log("SUBMIT FORM")
  }

  const switchUserRole = () => {
    if (userRole === 'student') {
      setUserRole('teacher');
    } else {
      setUserRole('student');
    }
  }

  const handleFirstNameChange = (event) => {
    const newFirstName = event.target.value;
    setFirstName(newFirstName);
  }

  const handleLastNameChange = (event) => {
    const newLastName = event.target.value;
    setLastName(newLastName);
  }

  const handleDateOfBirthChange = (event) => {
    const newBirthDate = event.target.value;
    console.log(newBirthDate);
    setDateOfBirth(newBirthDate);
    const age = calculateAge(newBirthDate);
    console.log('age', age);
    setIsAdultNameRequired(age < 16);
  };

  const handleAdultNameChange = (event) => {
    setAdultName(event.target.value);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const month = birthDate.getMonth();
    const day = birthDate.getDay();

    if (currentMonth < month - 1 || (currentMonth === month - 1 && currentDay < day)) {
      age--;
    }

    return age;
  }






  return (
    <section className="w-full max-w-xl mx-auto px-10 py-5">
      <h1 className="text-black font-medium text-3xl sm:text-4xl md:text-5xl font-spartan text-center mt-10 mb-5">Sign Up</h1>
      <p className="text-black font-spartan font-regular text-2xl text-left px-2">Already have an account?&nbsp;
        <Link to="/login" className="underline">Log In</Link>
      </p>

      {userRole === 'student' ? (
        <div className="flex w-full font-spartan font-medium text-[40px] text-grey text-center mb-5">
          <button className="basis-2/4 text-black border-b-[3px] border-black">as a Student</button>
          <button className="basis-2/4 border-b-[3px] border-grey" onClick={switchUserRole}>as a Teacher</button>
        </div>
      ) : (
        <div className="flex w-full font-spartan font-medium text-[40px] text-grey text-center mb-5">
          <h2 className="basis-2/4 border-b-[3px] border-grey" onClick={switchUserRole}>as a Student</h2>
          <h2 className="basis-2/4 text-black border-b-[3px] border-black">as a Teacher</h2>
        </div>
      )}


      <form className="w-full px-2" onSubmit={handleUserRegistration}>
        <div className="flex w-full gap-x-4">
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
        {userRole === 'student' && (
          <div className="flex w-full gap-x-4">
            <FormInput
              type="date"
              id="dob"
              label="dob"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              placeholder=" "
              className="basis-2/4">
              Date of Birth
            </FormInput>
            <FormInput
              type="text"
              id="adult-name"
              label="adult-name"
              value={adultName}
              onChange={handleAdultNameChange}
              placeholder=" "
              className="basis-2/4"
              disabled={!isAdultNameRequired}>
              Adult Full Name
            </FormInput>
          </div>
        )}
      </form>


    </section >
  );
};

export default Register;