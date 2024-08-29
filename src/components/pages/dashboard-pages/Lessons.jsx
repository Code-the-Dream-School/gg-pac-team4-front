import { getClassesData, getUserData } from '../../../util/DataBaseRequests';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../AuthProvider';

const Lessons = () => {
  const { userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedLesson, setSelectedLesson] = useState();
  const [lessonsError, setLessonsError] = useState({});
  const [teacherData, setTeacherData] = useState();

  useEffect(() => {
    const getStudentLessons = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          fetchError: 'Failed to fetch lessons. Please try again later.',
        });
      }
    };
    getStudentLessons();
  }, [userData]);

  useEffect(() => {
    if (selectedId) {
      const initialLesson = lessons.filter((lesson) =>
        selectedId.includes(lesson._id)
      );
      setSelectedLesson(initialLesson);
      console.log(initialLesson);
    }
  }, [selectedId]);

  // useEffect(()=> {
  //   if(selectedLesson){
  //     const getTeacherData = async () => {
  //     const response = await getUserData(selectedLesson[0].createdBy, userData.token);
  //     console.log(response.data)
  //     setTeacherData(response.data);
  //     }
  //   getTeacherData();
  //   }
  // },[selectedLesson])

  // console.log(teacherData)
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

  return (
    <>
      {lessonsError.fetchError && (
        <p className="text-red text-xl font-bold">{lessonsError.fetchError}</p>
      )}
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
        <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start">
          <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
            My lessons
          </h1>
          {lessons ? lessonsList : <p>No lessons booked yet.</p>}
        </div>
        {selectedLesson && (
          <div className="bg-pureWhite w-10/12 sm:w-3/5 flex flex-col gap-4 pb-6 self-center sm:self-start items-center">
            <div className='flex gap-4'>
              <div>
                <img
                  //src={teacherData.profileImageUrl}
                  className="w-20 h-20 rounded-full"
                  alt="teacher photo"
                />
              </div>
              <div>
                <button className="bg-red hover:bg-pureWhite hover:text-red h-8 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in">
                  Send message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Lessons;