import React, { useState } from 'react';
import axios from 'axios';
import FormInput from "../common/FormInput";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for accessibility

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setFormErrors({
        ...formErrors,
        email: "Email is required",
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/forgot-password', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(''); // Clear the message
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        setMessage('Invalid credentials');
      } else {
        setMessage(error.response?.data?.message || 'Wrong credentials');
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-red text-sm font-spartan">{message}</p>}
          {formErrors.email && <p className="text-red text-sm font-spartan">{formErrors.email}</p>}
          <FormInput
            type="email"
            placeholder=" "
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}    // Update email state on change         
          >
            Email
          </FormInput>
          <button
            type="submit"
            className={`w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg ${email ? 'bg-darkGreen hover:bg-darkGreen-darker' : 'bg-lightGreen cursor-not-allowed'}`}
            disabled={!email} // Disable button if email is empty
          >
            Send Reset Link
          </button>
        </form>
        <button
          onClick={() => navigate(-1)} // Navigate back on click
          className="w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg bg-gray-500 hover:bg-gray-700 mt-4"
        >
          Back
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Email Sent</h2>
          <p className="mb-4">A password reset link has been sent to your email. Check your email please</p>
          <button
            onClick={() => setIsModalOpen(false)} // Close modal on click
            className="w-full text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg bg-darkGreen hover:bg-darkGreen-darker"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;