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

const ClassInfoPage = () => {
  const { token } = useAuth();
  const { classId } = useParams();
  const [classItem, setClassItem] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchClassAndTeacher = async () => {
        try {
          // Fetch the class details
          const classData = await getClassDetails(classId, token);
          setClassItem(classData.class);

          // Fetch the teacher details
          if (classData.class.createdBy) {
            const teacherData = await getUserData(
              classData.class.createdBy,
              token
            );
            setTeacherInfo(teacherData.data);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClassAndTeacher();
    } else {
      console.error('No token found, user might not be logged in.');
    }
  }, [classId, token]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!classItem) return <p>Class not found.</p>;

  return (
    <div className="container m-auto py-20">
      <div className="flex flex-col w-full   justify-between text-black">
        <h2 className="font-spartan font-medium text-4xl">
          {classItem.classTitle}
        </h2>
        <div className="flex justify-between pt-8">
          <div className=" flex  flex-col w-[75%] md:flex-row lg:flex-row  pb-4">
            <div className="w-[60%] font-roboto text-xl mt-2">
              <p className="w-[95%]">{classItem.description}</p>
            </div>

            <div className="flex w-[40%]">
              <img
                className="rounded-lg"
                src={classItem.classImageUrl}
                alt={classItem.classTitle}
              />
            </div>
          </div>
          <div></div>
          <div className="flex flex-row w-[20%] lg:flex-col text-black border-2 border-lightGreen rounded-xl m-4">
            <div>
              <div className="flex flex-col text-center items-center justify-center  text-black p-4 bg-lightGreen">
                <p className="flex text-3xl items-center font-bold">
                  ${classItem.price}
                </p>
                <p className="flex  text-xl  items-center font-semibold">
                  per session
                </p>
              </div>
              <div className="py-2">
                <div className="flex items-center p-2 gap-2">
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
                <div className="flex items-center p-2 gap-2  hidden md:flex">
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
              <p>Date: {new Date(timeSlot.date).toLocaleDateString()}</p>
              <p>Start Time: {timeSlot.startTime}</p>
            </div>
          ))
        ) : (
          <p>No available times listed.</p>
        )}
      </div>

      <div className="flex flex-col mt-6">
        <p className="text-3xl font-spartan font-medium  mb-4">
          Meet the Teacher
        </p>

        <div className="flex flex-row">
          <img
            src={teacherInfo.profileImageUrl}
            alt={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex text-center items-center justify-center  pl-4">
            <p className="font-roboto font-medium text-xl">{`${teacherInfo.firstName} ${teacherInfo.lastName}`}</p>
          </div>
        </div>

        <div></div>

        <div>
          <p className="text-3xl font-spartan font-medium  my-4">
            Teacher education and experience
          </p>
          <div className="flex flex-row gap-2">
            <img src={IconDegree} alt="Icon degree" className="w-6 h-6" />
            <p className="font-roboto text-xl">{teacherInfo.education}</p>
          </div>

          <p className="font-roboto leading-7 text-xl pt-4 w-2/3">
            {teacherInfo.experience}
          </p>
          <a
            href="#more-info"
            className="text-black font-semibold underline hover:text-darkGreen"
          >
            Read More
          </a>
        </div>
      </div>
      <button
        className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/2 md:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in"
        // onClick={onNavigate}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ClassInfoPage;
