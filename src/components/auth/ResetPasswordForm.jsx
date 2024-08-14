import React, { useState, useEffect } from 'react';
import FormInput from "../common/FormInput";
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../util/DataBaseRequests';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    console.log('Extracted token from URL:', urlToken);
    if (urlToken) {
      setToken(urlToken);
    } else {
      console.error('No token found in URL');
    }
  }, []);

  const passwordsMatch = () => password === confirmPassword;

  const handlePasswordReset = async () => {
    try {
      const response = await resetPassword({ token, newPassword: password });
      console.log(response);
      setMessage('Password reset successful');
      navigate('/login');
    } catch (error) {
      setMessage(error.message || 'An error occurred');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch()) {
      setMessage('Passwords do not match');
      return;
    }

    await handlePasswordReset();
  };

  // Directly assign the boolean expression to a constant
  const arePasswordsEntered = password && confirmPassword;

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 ">
        <h2 className="font-spartan text-3xl text-center flex-grow">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-red text-sm font-spartan">{message}</p>}
          <FormInput
            type="password"
            placeholder=" "
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            New Password
          </FormInput>
          <FormInput
            type="password"
            placeholder=" "
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            Confirm New Password
          </FormInput>
          <button
            type="submit"
            className={`w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg ${arePasswordsEntered ? 'bg-darkGreen hover:bg-darkGreen-darker' : 'bg-lightGreen cursor-not-allowed'}`}
            disabled={!password || !confirmPassword}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;