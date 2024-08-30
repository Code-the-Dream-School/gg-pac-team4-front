import { getAllStudentLessons, getClassesData, getUserData } from './DataBaseRequests';
import { useEffect, useState } from 'react';

import { useAuth } from '../AuthProvider';

const useLessonsData = () => {
  const [studentClasses, setStudentClasses] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);
  const [studentLessons, setStudentLessons] = useState({});
  const [lessonsError, setLessonsError] = useState({});
  const [teacherData, setTeacherData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [previousLessons, setPreviousLessons] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [groupedLessons, setGroupedLessons] = useState({});
  const { userData } = useAuth();
  
  //get all classes in which the student is studying
  useEffect(() => {
    const getStudentClasses = async () => {
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
        if (filteredData.length > 0) {
          setStudentClasses(filteredData);
          setSelectedId(filteredData[0]._id);
          setLessonsError({ fetchError: '' });
          setIsLoading(false);
        } else {
          setLessonsError({
            fetchError: `You haven't booked any lessons yet.`,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          fetchError: 'Failed to fetch your classes and lessons. Please try again later.',
        });
        setIsLoading(false);
      }
    };
    getStudentClasses();
  }, [userData]);

  //get data about all student's booked lessons
  useEffect(() => {
    const getStudentLessons = async () => {
      try {
        setIsLoading(true);
        const response = await getAllStudentLessons(userData.token, userData._id);
        const allLessons = response.data.lessons;
        if (allLessons.length > 0) {
          setStudentLessons(allLessons);
          console.log('lessons', response.data.lessons);
          setLessonsError({ fetchError: '' });
          setIsLoading(false);
        } else {
          setLessonsError({
            fetchError: `You haven't booked any lessons yet.`,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          fetchError: 'Failed to fetch your classes and lessons. Please try again later.',
        });
        setIsLoading(false);
      }
    }
    getStudentLessons();
  }, [userData])

  useEffect(() => {
    if (selectedId) {
      const initialClass = studentClasses.find((studentClass) => studentClass._id === selectedId);
      setSelectedClass(initialClass ? [initialClass] : []);
      groupLessonsByClassId(selectedId);
    }
  }, [selectedId, studentClasses, studentLessons]);


  const groupLessonsByClassId = (classId) => {
    const filteredLessons = studentLessons.filter((lesson) => lesson.classId === classId);
    if (filteredLessons.length === 0) {
      setGroupedLessons(null);
      setLessonsError({ noLessons: "No lessons for this class." });
      return;
    }
    const grouped = {
      classId: classId,
      type: filteredLessons[0].type,
      createdBy: filteredLessons[0].createdBy,
      schedule: filteredLessons.map((lesson) => ({
        lessonTitle: lesson.lessonTitle,
        lessonDescription: lesson.lessonDescription,
        date: lesson.lessonSchedule.date,
        startTime: lesson.lessonSchedule.startTime,
        hometask: lesson.hometask,
        lessonFiles: lesson.lessonFiles.url,
      })),
    };
    setGroupedLessons(grouped);

    const today = new Date();
    const previous = grouped.schedule.filter(lesson => new Date(lesson.date) < today);
    const upcoming = grouped.schedule.filter(lesson => new Date(lesson.date) >= today);
    
    setPreviousLessons(previous);
    setUpcomingLessons(upcoming);
  };
  

  console.log('prev',previousLessons)
  console.log('up',upcomingLessons)
  console.log('selected',selectedClass);
  console.log('grouped', groupedLessons)

  useEffect(() => {
    if (selectedClass && selectedClass.length > 0) {
      const getTeacherData = async () => {
        try {
          const response = await getUserData(
            selectedClass[0].createdBy,
            userData.token
          );
          setTeacherData(response.data);
        } catch (error) {
          console.error('Error fetching teacher data:', error);
          setLessonsError({ teacherDataError: 'Failed to load lesson data, please try again later.' });
        }
      };
      getTeacherData();
    }
  }, [selectedClass, userData.token]);

  return {
    studentClasses,
    studentLessons,
    groupedLessons,
    previousLessons,
    upcomingLessons,
    selectedId,
    setSelectedId,
    selectedClass,
    lessonsError,
    teacherData,
    isLoading,
  };
};

export default useLessonsData;