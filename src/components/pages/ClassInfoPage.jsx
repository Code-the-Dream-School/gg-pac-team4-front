import React, { useEffect, useState } from 'react';
import { getClassDetails, getUserData } from '../../util/DataBaseRequests';
import { useAuth } from '../../AuthProvider';
import { useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import AgeIcon from '../../assets/icons/icon-age.svg';
import LessonTypeIcon from '../../assets/icons/icon-lesson.svg';
import ScheduleIcon from '../../assets/icons/icons-schedule.svg';

const ClassInfoPage = () => {
  const { token } = useAuth();
  const { classId } = useParams();
  const [classItem, setClassItem] = useState();
  const [teacherInfo, setTeacherInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (token) {
      const fetchClassItem = async () => {
        try {
          const classData = await getClassDetails(classId, token);
          setClassItem(classData.class);

          // Fetch teacher details
          //   if (classData.class.createdBy) {
          //     const teacherData = await getUserData(classData.class.createdBy, token);
          //     setTeacherInfo(teacherData.data);
          //   }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClassItem();
    } else {
      console.error('No token found, user might not be logged in.');
    }
  }, [classId, token]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!classItem) return <p>Class not found.</p>;

  return (
    <div className="container m-auto pt-24 justify-around ">
      <div className="flex flex-col w-full text-black">
        <h2 className="font-roboto font-medium text-2xl ">
          {classItem.classTitle}
        </h2>
      </div>
      <div className="flex justify-around rounded-lg">
        <div className="w-[40%] font-roboto text-xl mt-2">
          <p>{classItem.description}</p>
        </div>

        <div className="flex w-[33%]">
          <img
            className="rounded-lg"
            src={classItem.classImageUrl}
            alt={classItem.classTitle}
          />
        </div>
        <div className="flex flex-row lg:flex-col  justify-around text-black px-4 py-4 md:py-4 border-t border-gray lg:border-none">
          <div className="flex flex-col  w-[27%] gap-4  text-black">
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
            <img src={LessonTypeIcon} alt="Icon age" className="w-6 h-6" />
            <span>{classItem.type}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 hidden md:flex">
            <img src={ScheduleIcon} alt="Schedule Icon" className="w-6 h-6" />
            <span>On Request</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-4xl  font-medium mb-4">Class experience</p>
        <p>{classItem.experience}</p>
      </div>
      <div className="mt-6">
        <p className="text-4xl  font-medium mb-4">LearningGoals</p>
        <p>{classItem.goal}</p>
      </div>
      <div className="mt-6">
        <p className="text-4xl  font-medium mb-4">Other details</p>
        <p>{classItem.other}</p>
      </div>
      <div className="mt-6">
        <p className="text-4xl font-medium mb-4">Available times</p>
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

      <div>
        {/* <div>
              <p className="text-4xl  font-medium mb-4">Meet the teacher</p> 
          <p>Teacher: {teacherInfo.name}</p>
          <p>Bio: {teacherInfo.bio}</p>
          <p>Email: {teacherInfo.email}</p>
        </div>  */}
      </div>
    </div>
  );
};

export default ClassInfoPage;
