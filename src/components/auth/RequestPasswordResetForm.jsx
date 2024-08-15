import React, { useState } from 'react';
import { sendResetLink } from '../../util/DataBaseRequests';
import FormInput from '../common/FormInput';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import handleError from '../../util/errorMessages';

Modal.setAppElement('#root'); // Set the app element for accessibility

const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    if (!email) {
      setFormErrors({
        ...formErrors,
        email: 'Email is required',
      });
      return false;
    }
    return true;
  };

  // Function to send reset link
  const sendResetLinkRequest = async () => {
    try {
      await sendResetLink({ email });
      setMessage('');
      setIsModalOpen(true);
    } catch (error) {
      handleError(error, setFormErrors);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await sendResetLinkRequest();
    }
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 md:w-1/2 lg:w-1/3 xl:w-3/10 p-8 space-y-8"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)} // Navigate back on click
            className="text-gray-500 hover:text-gray-700"
          >
            &larr; Back
          </button>
          <h2 className="font-spartan text-3xl text-center flex-grow">
            Forgot Password
          </h2>
        </div>
        {message && <p className="text-red text-sm font-spartan">{message}</p>}
        {formErrors.email && (
          <p className="text-red text-sm font-spartan">{formErrors.email}</p>
        )}
        {formErrors.form && (
          <p className="text-red text-sm font-spartan">{formErrors.form}</p>
        )}
        <FormInput
          type="email"
          placeholder=" "
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal on request
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70"
      >
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-50">
          <h2 className="text-2xl font-bold mb-4">Email Sent</h2>
          <p className="mb-8">
            A password reset link has been sent to your email. Check your email
            please
          </p>
          <button
            onClick={() => setIsModalOpen(false)} // Close modal on click
            className="w-full text-white font-spartan font-semibold text-lg py-1 rounded-lg bg-darkGreen hover:bg-darkGreen-darker"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RequestPasswordResetForm;