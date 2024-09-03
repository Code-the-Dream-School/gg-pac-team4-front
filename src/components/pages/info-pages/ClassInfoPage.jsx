import React, { useEffect, useState } from 'react';
import { getClassDetails, getUserData } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import AgeIcon from '../../../assets/icons/icon-age.svg';
import LessonTypeIcon from '../../../assets/icons/icon-lesson.svg';
import ScheduleIcon from '../../../assets/icons/icons-schedule.svg';
import IconClock from '../../../assets/icons/icon-clock.svg';
import IconTypeLesson from '../../../assets/icons/icon-type.png';
import TeacherInfo from './TeacherInfo';
import { bookLesson } from '../../../util/DataBaseRequests';
import SuccessModal from '../../common/SuccessModal';
import ApplyModal from '../../common/ApplyModal';
import { formatDateWithWeekday } from '../../../util/NotificationsUtils';

const ClassInfoPage = () => {
  const { userData } = useAuth();
  const { classId } = useParams();
  const [classItem, setClassItem] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      const fetchClassAndTeacher = async () => {
        try {
          // Fetch the class details
          const classData = await getClassDetails(classId, userData.token);
          setClassItem(classData.class);

          // Fetch the teacher details
          if (classData.class.createdBy) {
            const teacherData = await getUserData(
              classData.class.createdBy,
              userData.token
            );
            setTeacherInfo(teacherData.data);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchClassAndTeacher();
    } else {
      error('User should log in.');
    }
  }, [classId, userData]);

  const handleTimeSelection = (selectedId) => {
    setSelectedTimeId(selectedId);
    setError(null);
  };
  const handleBookLesson = async () => {
    try {
      if (selectedTimeId) {
        await bookLesson(userData.token, classId, selectedTimeId);
        setError(null);
        closeModal(false); //close apply modal
        setIsSuccessModalOpen(true); // Open success modal
      } else {
        setError('Please select a time slot.');
      }
    } catch (error) {
      setError(error.message || 'Error booking lesson.');
    }
  };

  const closeModal = () => {
    setError(null);
    setIsModalOpen(false);
    setSelectedTimeId(null); // Reset the selected time ID
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    window.location.reload(); // Reloads the page
  };

  if (isLoading) return <Loader />;
  // if (error) return <p>Error: {error}</p>;
  if (!classItem) return <p>Class not found.</p>;

  return (
    <div className="container m-auto w-10/12">
      <div className="flex flex-col w-full text-black">
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-[75%] md:flex-row lg:flex-row pb-4">
            <div className="w-full m:w-[60%] font-roboto text-xl">
              <h2 className="font-spartan font-medium text-4xl pb-8">
                {classItem.classTitle}
              </h2>
              <p className="w-full md:w-[95%]">{classItem.description}</p>
            </div>

            <div className="flex w-full lg:w-3/4 pl-0 md:pl-2">
              <img
                className="rounded-lg"
                src={classItem.classImageUrl}
                alt={classItem.classTitle}
              />
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-[15%] text-black   rounded-xl mt-4 mb-8 lg:m-4">
            <div>
              <div className="border-2 border-lightGreen rounded-lg flex flex-row flex-wrap justify-between lg:flex-col">
                <div className="flex flex-col text-center items-center justify-center text-black p-4 mb-4 lg:bg-lightGreen">
                  <p className="flex text-3xl items-center font-bold">
                    ${classItem.price}
                  </p>
                  <p className="flex text-xl items-center font-semibold">
                    per session
                  </p>
                </div>

                <div className="flex items-center p-2">
                  <img src={AgeIcon} alt="Icon age" className="w-6 h-6" />
                  <span>
                    Ages: {classItem.ages.minAge} - {classItem.ages.maxAge}
                  </span>
                </div>
                <div className="flex items-center p-2 gap-2">
                  <img src={IconClock} alt="Icon clock" className="w-6 h-6" />
                  <span>{classItem.duration} min</span>
                </div>
                <div className="flex items-center p-2 gap-2">
                  <img
                    src={LessonTypeIcon}
                    alt="Icon age"
                    className="w-6 h-6"
                  />
                  <span>{classItem.type}</span>
                </div>
                <div className="flex items-center p-2 gap-2 md:flex">
                  <img
                    src={ScheduleIcon}
                    alt="Schedule Icon"
                    className="w-6 h-6"
                  />
                  <span>On Request</span>
                </div>

                <div className="flex items-center p-2 gap-2">
                  <img
                    src={IconTypeLesson}
                    alt="Icon age"
                    className="w-6 h-6"
                  />
                  <span>{classItem.lessonType}</span>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red hover:bg-pureWhite hover:text-red px-12 mr-45 py-2 mt-4 border-2 border-transparent hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 ease-in"
                >
                  Book lesson
                </button>
                <ApplyModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  applicationInfo={classItem.availableTime}
                  onTimeSelect={handleTimeSelection}
                  onBookLesson={handleBookLesson}
                  error={error}
                  selectedTimeId={selectedTimeId}
                  setSelectedTimeId={setSelectedTimeId}
                />
                <SuccessModal
                  isOpen={isSuccessModalOpen}
                  onRequestClose={closeSuccessModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">
          Class experience
        </p>
        <p className="font-roboto text-xl w-full md:w-2/3">
          {classItem.experience}
        </p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium  mb-4">
          Learning Goals
        </p>
        <p className="font-roboto text-xl w-full md:w-2/3">{classItem.goal}</p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">Other details</p>
        <p className="font-roboto text-xl w-full md:w-2/3">{classItem.other}</p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">
          Available times
        </p>
        {classItem.availableTime && classItem.availableTime.length > 0 ? (
          classItem.availableTime.map((timeSlot) => (
            <div key={timeSlot._id}>
              <p>{formatDateWithWeekday(timeSlot.date)}</p>
            </div>
          ))
        ) : (
          <p>No available times listed.</p>
        )}
      </div>
      {teacherInfo && <TeacherInfo teacherInfo={teacherInfo} />}
    </div>
  );
};

export default ClassInfoPage;
