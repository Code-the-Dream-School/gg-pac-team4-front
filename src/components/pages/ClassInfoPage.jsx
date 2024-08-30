import React, { useEffect, useState } from 'react';
import { getClassDetails, getUserData } from '../../util/DataBaseRequests';
import { useAuth } from '../../AuthProvider';
import { useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import AgeIcon from '../../assets/icons/icon-age.svg';
import LessonTypeIcon from '../../assets/icons/icon-lesson.svg';
import ScheduleIcon from '../../assets/icons/icons-schedule.svg';
import IconClock from '../../assets/icons/icon-clock.png';
import IconDegree from '../../assets/icons/icons-degree.png';
import { bookLesson } from '../../util/DataBaseRequests';
import ApplyModal from '../common/applyModal';

const TeacherInfo = ({ teacherInfo }) => {
  const [showFullExperience, setShowFullExperience] = useState(false);
  //handle ReadMore button
  const handleToggleExperience = () => {
    setShowFullExperience(!showFullExperience);
  };
  return (
    <div className="mt-6">
      <p className="text-3xl font-spartan font-medium  mb-4">
        Meet the Teacher
      </p>
      <div className="flex flex-row">
        {teacherInfo.profileImageUrl && (
          <img
            src={teacherInfo.profileImageUrl}
            alt={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
            className="w-20 h-20 rounded-full"
          />
        )}
        <div className="flex text-center items-center justify-center  pl-4">
          <p className="font-roboto font-medium text-xl">{`${teacherInfo.firstName || ''} ${teacherInfo.lastName || ''}`}</p>
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-4">
        {teacherInfo.profileImageUrl && (
          <button className="bg-pureWhite py-1 px-4 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
            Profile
          </button>
        )}
        <button className="bg-pureWhite py-1 px-4 hover:bg-red hover:text-pureWhite hover:border-2 hover-border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
          Send Message
        </button>
      </div>
      <div className="mt-6">
        {teacherInfo.education && (
          <>
            <p className="text-3xl font-spartan font-medium lg:my-4">
              Teacher education and experience
            </p>
            <div className="flex flex-row gap-2">
              <img src={IconDegree} alt="Icon degree" className="w-6 h-6" />
              <p className="font-roboto text-xl">{teacherInfo.education}</p>
            </div>
          </>
        )}
        {teacherInfo.experience && (
          <>
            <p className="font-roboto leading-7 text-xl pt-4 w-2/3">
              {showFullExperience
                ? teacherInfo.experience
                : `${teacherInfo.experience.substring(0, 100)}...`}
            </p>
            <button
              onClick={handleToggleExperience}
              className="text-black font-semibold underline hover:text-darkGreen"
            >
              {showFullExperience ? 'Show Less' : 'Read More'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ClassInfoPage = () => {
  const { userData } = useAuth();
  const { classId } = useParams();
  const [classItem, setClassItem] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState(null);

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
          const applicationInfo = classData.class.availableTime;
          const availableTimeId = applicationInfo
            .map((availableTime) => availableTime._id)
            .toString();
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchClassAndTeacher();
    } else {
      console.error('No token found, user might not be logged in.');
    }
  }, [classId, userData]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!classItem) return <p>Class not found.</p>;

  const handleTimeSelection = (selectedId) => {
    setSelectedTimeId(selectedId);
  };
  const handleBookLesson = async () => {
    try {
      if (selectedTimeId) {
        await bookLesson(userData.token, classId, selectedTimeId);
        alert('Lesson booked successfully!');
        closeModal();
      } else {
        alert('Please select a time slot.');
      }
    } catch (error) {
      console.error('Error booking lesson:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container m-auto p-10">
      <div className="flex flex-col w-full text-black">
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" flex  flex-col  w-full lg:w-[75%] md:flex-row lg:flex-row pb-4">
            <div className="w-full m:w-[60%] font-roboto text-xl">
              <h2 className="font-spartan font-medium text-4xl pb-8">
                {classItem.classTitle}
              </h2>
              <p className="w-full md:w-[95%]">{classItem.description}</p>
            </div>

            <div className="flex w-full lg:w-3/4 pl-0  md:pl-2">
              <img
                className="rounded-lg"
                src={classItem.classImageUrl}
                alt={classItem.classTitle}
              />
            </div>
          </div>

          <div className="flex flex-row w-full lg:w-[15%] lg:flex-col text-black border-2 border-lightGreen rounded-xl mt-4 mb-8 lg:m-4">
            <div className="flex flex-row flex-wrap justify-between lg:flex-col">
              <div className="flex flex-col text-center items-center justify-center  text-black p-4 lg:bg-lightGreen">
                <p className="flex text-3xl items-center font-bold">
                  ${classItem.price}
                </p>
                <p className="flex  text-xl  items-center font-semibold">
                  per session
                </p>
              </div>

              <div className="flex items-center  p-2">
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
                <img src={LessonTypeIcon} alt="Icon age" className="w-6 h-6" />
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red hover:bg-pureWhite hover:text-red px-12 mr-36 py-2 border-2 border-transparent hover:border-red text-white font-roboto text-xl rounded-md"
        >
          Book Lesson
        </button>
        <ApplyModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          applicationInfo={classItem.availableTime}
          onTimeSelect={handleTimeSelection}
          onBookLesson={handleBookLesson}
        />
      </div>

      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">
          Class experience
        </p>
        <p className="font-roboto text-xl w-2/3">{classItem.experience}</p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium  mb-4">
          Learning Goals
        </p>
        <p className="font-roboto text-xl w-2/3">{classItem.goal}</p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">Other details</p>
        <p className="font-roboto text-xl w-2/3">{classItem.other}</p>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-spartan font-medium mb-4">
          Available times
        </p>
        {classItem.availableTime && classItem.availableTime.length > 0 ? (
          classItem.availableTime.map((timeSlot) => (
            <div key={timeSlot._id}>
              <p>{`${new Date(timeSlot.date).toLocaleDateString()} ${timeSlot.startTime}`}</p>
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
