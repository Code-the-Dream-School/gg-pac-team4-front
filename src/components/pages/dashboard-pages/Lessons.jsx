import { getClassesData, getUserData } from '../../../util/DataBaseRequests';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../AuthProvider';

const Lessons = () => {
  const { userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedLesson, setSelectedLesson] = useState();
  const [lessonsError, setLessonsError] = useState({});

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
        setLessonsError({ message: '' });
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          message: 'Failed to fetch lessons. Please try again later.',
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

  useEffect(()=> {
    if(selectedLesson){
      const getTeacherData = async () => {
      const teacherId = selectedLesson[0].createdBy;
      console.log(typeof(teacherId))
      // const response = await getUserData(teacherId, userData.token);
      // console.log(response);
    };
    getTeacherData();
    }
  },[selectedLesson])

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
      { lessonsError && <p className="text-red text-xl font-bold">{lessonsError.message}</p> }
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
        <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start">
          <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
            My lessons
          </h1>
          {lessons ? lessonsList : <p>No lessons booked yet.</p>}
        </div>
        <div className="bg-pureWhite w-10/12 sm:w-3/5 flex flex-col gap-4 pb-6 self-center sm:self-start items-center"></div>
      </div>
    </>
  );
};

export default Lessons;