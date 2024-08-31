import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success"
      className="fixed inset-0 flex items-center justify-center z-100"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70"
    >
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Success</h2>
        <p className="text-center mb-8">
          Your application has been successfully submitted!
        </p>
        <button
          onClick={onRequestClose}
          className="w-full text-white font-spartan font-semibold text-lg py-2 rounded-lg bg-darkGreen hover:bg-darkGreen-darker transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
