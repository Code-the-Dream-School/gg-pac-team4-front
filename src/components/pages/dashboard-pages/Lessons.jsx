import { getClassesData, getUserData } from '../../../util/DataBaseRequests';
import { useEffect, useState } from 'react';

import Loader from '../../common/Loader';
import { useAuth } from '../../../AuthProvider';

const Lessons = () => {
  const { userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedLesson, setSelectedLesson] = useState();
  const [lessonsError, setLessonsError] = useState({});
  const [teacherData, setTeacherData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStudentLessons = async () => {
      
      try {
        setIsLoading(true);
        const response = await getClassesData();
        const allClasses = response.classes;
        const filteredData = allClasses.filter(
          (classItem) =>
            classItem.classStudents &&
            classItem.classStudents.some(
              (classStudent) => classStudent.userId === userData._id
            )
        );
        setLessons(filteredData);
        setSelectedId(filteredData[0]._id);
        setLessonsError({ fetchError: '' });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          fetchError: 'Failed to fetch lessons. Please try again later.',
        });
        setIsLoading(false);
      }
    };
    getStudentLessons();
  }, [userData]);

  useEffect(() => {
    if (selectedId) {
      const initialLesson = lessons.find((lesson) => lesson._id === selectedId);
      setSelectedLesson(initialLesson ? [initialLesson] : []);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedLesson && selectedLesson.length > 0) {
      const getTeacherData = async () => {
        try {
          const response = await getUserData(
            selectedLesson[0].createdBy,
            userData.token
          );
          console.log(response.data);
          setTeacherData(response.data);
        } catch (error) {
          console.error('Error fetching teacher data:', error);
          setLessonsError({ teacherDataError: 'Failed to load teacher data' });
        }
      };
      getTeacherData();
    }
  }, [selectedLesson]);

  // console.log(teacherData);
  // console.log(selectedLesson);

  const lessonsList = lessons.map(({ _id, classImageUrl, classTitle }) => {
    const active = _id === selectedId;
    const selectedStyle = active
      ? 'flex flex-col lg:flex-row w-full justify-center items-center p-2 transition duration-300 easy-in bg-darkGreen'
      : 'flex flex-col lg:flex-row w-full  justify-center items-center p-2 hover:bg-lightGreen transition duration-300 easy-in';
    return (
      <div
        key={_id}
        onClick={() => setSelectedId(_id)}
        className={selectedStyle}
      >
        <img
          src={classImageUrl}
          className="w-32 md:w-24 rounded aspect-[4/3]"
          alt="class image small"
        />
        <p className="font-spartan font-semibold sm:text-lg text-center w-full">
          {classTitle}
        </p>
      </div>
    );
  });
  
  if (isLoading) return <Loader/>;
  
  return (
    <>
      {lessonsError.fetchError && (
        <p className="text-red text-xl font-bold">{lessonsError.fetchError}</p>
      )}
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
        <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start rounded">
          <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
            My lessons
          </h1>
          {lessons ? lessonsList : <p>No lessons booked yet.</p>}
        </div>
        {lessonsError.teacherDataError && (
          <p className="text-red text-xl font-bold">
            {lessonsError.teacherDataError}
          </p>
        )}
        {teacherData && !lessonsError.teacherDataError && (
          <div className="bg-pureWhite w-10/12 sm:w-3/5 flex flex-col gap-4 p-6 self-center md:self-start items-center rounded">
            <div className="flex w-full justify-between p-6 flex-col lg:flex-row gap-4">
              <div className="flex lg:w-1/2 justify-around gap-4">
                <img
                  src={teacherData.profileImageUrl}
                  className="w-20 h-20 lg:w-32 lg:h-32 rounded-full"
                  alt="teacher photo"
                />
                <div className="flex flex-col justify-between">
                  <p className="font-spartan font-semibold text-lg sm:text-2xl lg:text-3xl">
                    {teacherData.firstName} {teacherData.lastName}
                  </p>
                  <h2 className="font-spartan font-medium text-lg sm:text-2xl lg:text-3xl">
                    {selectedLesson[0].classTitle}
                  </h2>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-end">
                <button className="w-full bg-red hover:bg-pureWhite hover:text-red lg:h-10 hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg sm:text-xl rounded-lg transition duration-300 easy-in">
                  Send message
                </button>
              </div>
            </div>

            <div className='self-start w-full'>
              <p className="lg:text-lg px-6">{selectedLesson[0].description}</p>
            </div>

            {/* <div className='self-start'>
              <h3 className="font-medium text-xl self-start px-6">Homework and other study materials</h3>
            </div> */}
            
            {selectedLesson[0].availableTime.length > 0 && (
              <div className="self-start flex flex-col w-full md:w-1/2 mt-4">
                {/* Upcoming Lessons */}
                <h3 className="font-medium text-lg lg:text-xl px-6">
                  Upcoming lessons
                </h3>

                <div className="flex flex-col">
                  <div className="flex justify-around mt-4 font-medium lg:text-lg">
                    <p>Date</p>
                    <p>Time</p>
                  </div>
                  {selectedLesson[0].availableTime.some(
                    (time) => new Date(time.date) >= new Date()
                  ) ? (
                    selectedLesson[0].availableTime
                      .filter((time) => new Date(time.date) >= new Date())
                      .map((time, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="flex justify-around w-full mt-2"
                        >
                          <p>
                            {new Date(time.date).toLocaleDateString('en-US', {
                              timeZone: 'UTC',
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })}
                          </p>
                          <p>{time.startTime}</p>
                        </div>
                      ))
                  ) : (
                    <p className="ml-6 mt-2">No upcoming lessons.</p>
                  )}
                </div>
              </div>
            )}
            {selectedLesson[0].availableTime.length > 0 && (
              <div className="self-start flex flex-col w-full md:w-1/2 mt-4">
                {/* Previous Lessons */}
                <h3 className="font-medium text-lg lg:text-xl self-start px-6">
                  Previous lessons
                </h3>

                <div className="flex flex-col">
                  <div className="flex justify-around mt-4 font-medium lg:text-lg">
                    <p>Date</p>
                    <p>Time</p>
                  </div>
                  {selectedLesson[0].availableTime.some(
                    (time) => new Date(time.date) < new Date()
                  ) ? (
                    selectedLesson[0].availableTime
                      .filter((time) => new Date(time.date) < new Date())
                      .map((time, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="flex justify-around w-full mt-2"
                        >
                          <p>{selectedLesson[0].classTitle}</p>
                          <p>
                            {new Date(time.date).toLocaleDateString('en-US', {
                              timeZone: 'UTC',
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })}
                          </p>
                          <p>{time.startTime}</p>
                        </div>
                      ))
                  ) : (
                    <p className="ml-6 mt-2">No previous lessons.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Lessons;