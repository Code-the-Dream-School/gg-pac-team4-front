import React from 'react';
import Modal from 'react-modal';

const ApplyModal = ({ isOpen, onRequestClose, applicationInfo, onTimeSelect, onBookLesson, }) => {
  const applyDate = applicationInfo.map((item) => item.date);
  const applyTime = applicationInfo.map((item) => item.startTime);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Apply"
      className="fixed inset-0 flex items-center justify-center z-100"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70"
    >
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Book Lesson</h2>
        <p className="mb-8 text-center">Please choose available time:</p>
        <div className="mt-4 mb-10">
        {applicationInfo.map((item) => (
  <button
    key={item._id}
    onClick={() => onTimeSelect(item._id)}
    className="block w-full text-left p-2 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
  >
    {`${new Date(item.date).toLocaleDateString()} ${item.startTime}`}
  </button>
))}
        </div>
        <button
          onClick={onBookLesson}
          className="w-full text-white font-spartan font-semibold text-lg py-2 rounded-lg bg-darkGreen hover:bg-darkGreen-darker transition duration-200"
        >
          Book Lesson
        </button>
        <button
          onClick={onRequestClose}
          className="w-full text-white font-spartan font-semibold text-lg py-2 mt-4 rounded-lg bg-darkGray hover:bg-darkGray-darker transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ApplyModal;
