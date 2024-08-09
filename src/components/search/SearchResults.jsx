import React from 'react';
import AgeIcon from '../../assets/icons/icon-age.png';
import LessonTypeIcon from '../../assets/icons/icon-lesson.png';
import ScheduleIcon from '../../assets/icons/icons-schedule.png';

const SearchResults = ({ classes, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="container m-auto">
      {classes.length > 0 ? (
        <>
          <div className="flex flex-col gap-6 mt-10">
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="flex flex-row border h-[350px] rounded-lg shadow-md"
              >
                <div className="flex  justify-center items-center p-8 rounded-lg">
                  <img
                    className="w-[350px] h-[250px] object-cover rounded-lg"
                    src={classItem.classImageUrl}
                    alt={classItem.classTitle}
                  />
                </div>
                <div className="flex flex-col w-3/5 justify-around gap-4 px-4 text-black">
                  <h2 className="font-roboto font-medium text-2xl mt-4">
                    {classItem.classTitle}
                  </h2>
                  <p className="font-roboto text-xl mt-2">
                    {classItem.description}
                  </p>
                  <p className="mt-2">{classItem.createdBy}</p>
                </div>
                <div className="flex flex-col  justify-around text-black px-4">
                  <div className="flex flex-col  gap-4  text-black">
                    <p className="flex text-3xl font-medium items-center justify-center">
                      ${classItem.price}
                    </p>
                    <p className="text-xl flex  justify-center items-center">
                      per session
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={AgeIcon} alt="Icon age" className="w-6 h-6" />
                    <span>
                      Ages: {classItem.ages.minAge} - {classItem.ages.maxAge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={LessonTypeIcon}
                      alt="Icon age"
                      className="w-6 h-6"
                    />
                    <span>{classItem.type}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={ScheduleIcon}
                      alt="Schedule Icon"
                      className="w-6 h-6"
                    />
                    <span>On Request</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-darkGreen text-white px-4 py-2 rounded-full"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-darkGreen text-white px-4 py-2 rounded-full"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
