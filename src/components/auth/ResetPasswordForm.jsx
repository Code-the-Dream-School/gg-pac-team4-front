import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from "../common/FormInput";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.patch('http://localhost:8000/api/v1/reset-password', {
        token: token,
        newPassword: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage('Password reset successful');
      navigate('/login'); 
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  const arePasswordsEntered = () => password && confirmPassword;

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
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
            className={`w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg ${arePasswordsEntered() ? 'bg-darkGreen hover:bg-darkGreen-darker' : 'bg-lightGreen cursor-not-allowed'}`}
            disabled={!arePasswordsEntered()}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;