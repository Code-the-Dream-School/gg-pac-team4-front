import React, { useState } from 'react';
import Modal from 'react-modal';
import { formatDateWithoutWeekday } from '../../util/NotificationsUtils';

const ApplyModal = ({
  isOpen,
  onRequestClose,
  applicationInfo,
  onTimeSelect,
  onBookLesson,
  error,
  selectedTimeId,
  setSelectedTimeId,
}) => {
  const hasAvailableTimes = applicationInfo.length > 0;

  const handleTimeClick = (id) => {
    setSelectedTimeId(id);
    onTimeSelect(id);
  };

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
        <p className="mb-8 text-center">
          {hasAvailableTimes
            ? 'Please choose available time:'
            : 'No available time'}
        </p>
        {hasAvailableTimes ? (
          <div className="mt-4 mb-10">
            {applicationInfo.map((item) => (
              <button
                key={item._id}
                onClick={() => handleTimeClick(item._id)}
                className={`block w-full text-left p-2 mb-2 rounded-lg ${
                  selectedTimeId === item._id
                    ? 'bg-darkGreen text-white hover:darkGreen'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {formatDateWithoutWeekday(item.date)} || {item.startTime}
              </button>
            ))}
          </div>
        ) : null}
        {error && (
          <div className="bg-red-100 text-red p-4 mb-4 rounded">
            <p className="text-center">{error}</p>
          </div>
        )}
        {hasAvailableTimes && (
          <button
            onClick={onBookLesson}
            className="w-full text-white font-spartan font-semibold text-lg py-2 rounded-lg bg-darkGreen hover:bg-darkGreen-darker transition duration-200"
          >
            Book Lesson
          </button>
        )}
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
