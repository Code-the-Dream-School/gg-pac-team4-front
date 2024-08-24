import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { registerStudent, registerTeacher } from '../../util/DataBaseRequests';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [userRole, setUserRole] = useState('student');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [isAdultNameRequired, setIsAdultNameRequired] = useState(false);
  const [adultName, setAdultName] = useState('');
  const [adultNameError, setAdultNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const handleUserRegistration = async (event) => {
    event.preventDefault();
    let isDataValid = formValidation();

    if (isDataValid) {
      try {
        let result;
        if (userRole == 'student') {
          let studentData = {
            "firstName": firstName.trim(),
            "lastName": lastName.trim(),
            "email": email.trim(),
            "password": password,
            "dateOfBirth": dateOfBirth,
            "adultName": adultName.trim(),
          };
          result = await registerStudent(studentData);
        } else {
          let teacherData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
          };
          result = await registerTeacher(teacherData);
        }
        console.log(result);
        if (result.status === 201) {
          setIsModalOpen(true);
        }
      } catch (error) {
        parseErrorMessage(error.message);
      }
    }
  }

  const formValidation = () => {
    let isDataValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('First Name is required');
      isDataValid = false;
    } else {
      setFirstNameError('');
    }

    if (lastName.trim() === '') {
      setLastNameError('Last Name is required');
      isDataValid = false;
    } else {
      setLastNameError('');
    }


    if (email.trim() === '') {
      setEmailError('Email is required');
      isDataValid = false;
    } else {
      setEmailError('');
    }

    if (email !== confirmEmail) {
      setConfirmEmailError('Emails do not match');
      isDataValid = false;
    } else {
      setConfirmEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isDataValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isDataValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isAdultNameRequired && adultName.trim() === '') {
      setAdultNameError('Adult name is required for students under 16');
      isDataValid = false;
    } else {
      setAdultNameError('');
    }

    if (dateOfBirth == '' && userRole === 'student') {
      setDateOfBirthError('Date of birth is required');
      isDataValid = false;
    } else {
      setDateOfBirthError('');
    }

    return isDataValid;
  }

  const parseErrorMessage = (message) => {
    setFirstNameError(getErrorForField('firstName', message));
    setLastNameError(getErrorForField('lastName', message));
    setDateOfBirthError(getErrorForField('dateOfBirth', message));
    setAdultNameError(getErrorForField('adultName', message));
    setEmailError(getErrorForField('email', message));
    setPasswordError(getErrorForField('password', message));
  }

  const getErrorForField = (field, message) => {
    field += ':';
    if (message.includes(field)) {
      const idx1 = message.lastIndexOf(field) + field.length;
      const idx2 = message.indexOf(',', idx1);
      if (idx2 > idx1) {
        return message.substring(idx1 + 1, idx2);
      } else {
        return message.substring(idx1 + 1);
      }
    }
    return '';
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
    setDateOfBirth(newBirthDate);
    const age = calculateAge(newBirthDate);
    setIsAdultNameRequired(age < 16);
    setAdultNameError('');
  };

  const handleAdultNameChange = (event) => {
    setAdultName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (newEmail.trim() !== '') {
      setEmailError('');
    }
  }

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.trim() !== '') {
      setPasswordError('');
    }
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleGotoLogin = () => {
    setIsModalOpen(false);
    navigate('/login');
  }

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
      <p className="text-black font-spartan font-regular text-xl text-left px-2 mb-2">Already have an account?&nbsp;
        <Link to="/login" className="underline">Log In</Link>
      </p>

      <RegisterForm
        onSubmit={handleUserRegistration}
        userRole={userRole}
        switchUserRole={switchUserRole}
        firstName={firstName}
        firstNameError={firstNameError}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        lastNameError={lastNameError}
        handleLastNameChange={handleLastNameChange}
        dateOfBirth={dateOfBirth}
        dateOfBirthError={dateOfBirthError}
        handleDateOfBirthChange={handleDateOfBirthChange}
        adultName={adultName}
        adultNameError={adultNameError}
        handleAdultNameChange={handleAdultNameChange}
        isAdultNameRequired={isAdultNameRequired}
        email={email}
        emailError={emailError}
        handleEmailChange={handleEmailChange}
        confirmEmail={confirmEmail}
        confirmEmailError={confirmEmailError}
        handleConfirmEmailChange={handleConfirmEmailChange}
        password={password}
        passwordError={passwordError}
        handlePasswordChange={handlePasswordChange}
        confirmPassword={confirmPassword}
        confirmPasswordError={confirmPasswordError}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleGotoLogin}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center z-100"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70"
      >
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-100">
          <h2 className="text-2xl font-bold mb-4 text-center">Registration completed successfully</h2>
          <p className="mb-8 text-center">
            Please login to continue.
          </p>
          <button
            onClick={handleGotoLogin} // Close modal on click and redirect on login page
            className="w-full text-white font-spartan font-semibold text-lg py-1 rounded-lg bg-darkGreen hover:bg-darkGreen-darker"
          >
            Log In
          </button>
        </div>
      </Modal>

    </section>
  );
};

export default Register;