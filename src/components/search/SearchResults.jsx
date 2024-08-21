import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgeIcon from '../../assets/icons/icon-age.svg';
import LessonTypeIcon from '../../assets/icons/icon-lesson.svg';
import ScheduleIcon from '../../assets/icons/icons-schedule.svg';

const SearchResults = ({ classes, currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <div className="container m-auto ">
      {classes.length > 0 ? (
        <div>
          <div className="flex flex-col gap-6 mt-10 m-5 md:m-10">
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="flex flex-col lg:flex-row  border  rounded-lg  border-gray p-0  py-5 lg:p-5 hover:shadow-lg cursor-pointer "
                onClick={() => handleClick()}
              >
                <div className="flex  flex-col md:flex-row lg:flex-row md:w-full lg:w-[80%] xl:w-[85%] pb-4">
                  <div className="flex w-full md:w-[30%] justify-center items-center rounded-lg">
                    <img
                      className="rounded-lg"
                      src={classItem.classImageUrl}
                      alt={classItem.classTitle}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-[70%] justify-around px-4 text-black">
                    <h2 className="font-roboto font-medium text-2xl mt-4">
                      {classItem.classTitle}
                    </h2>
                    <p className="font-roboto text-xl mt-2">
                      {classItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col  justify-around text-black px-4 py-4 md:py-4 border-t border-gray lg:border-none">
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
                  <div className="flex items-center gap-2 mt-2 hidden md:flex">
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

          <div className="flex justify-center m-6">
            {totalPages > 1 && (
              <>
                {currentPage > 1 && (
                  <button
                    className="bg-darkGreen text-white px-4 py-2 rounded-full"
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                <span className="flex items-center mx-4">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <button
                    className="bg-darkGreen text-white px-4 py-2 rounded-full"
                    onClick={() => onPageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
