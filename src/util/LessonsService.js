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
  const [nextTwoLessons, setNextTwoLessons] = useState([]);
  const { userData } = useAuth();
  const today = new Date();
  
  //get all classes the student is studying in
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
    if(studentClasses){
      const getStudentLessons = async () => {
      try {
        const response = await getAllStudentLessons(userData.token, userData._id);
        const allLessons = response.data.lessons;
        if (allLessons.length > 0) {
          setStudentLessons(allLessons);
          setLessonsError({ fetchError: '' });
        } else {
          setLessonsError({
            fetchError: `You haven't booked any lessons yet.`,
          });
        }
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setLessonsError({
          fetchError: 'Failed to fetch your classes and lessons. Please try again later.',
        });
      }
    }
    getStudentLessons();
    }
  }, [userData, studentClasses])

  useEffect(() => {
    if (selectedId) {
      const initialClass = studentClasses.find((studentClass) => studentClass._id === selectedId);
      setSelectedClass(initialClass ? [initialClass] : []);
      groupLessonsByClassId(selectedId);
    }
  }, [selectedId, studentClasses, studentLessons]);

  useEffect(() => {
    const handleNextLessons = async () => {
      if (!studentLessons || studentLessons.length === 0) return;
  
      try {
        const nextLessons = studentLessons
          .map(lesson => ({
            ...lesson,
            lessonSchedule: {
              ...lesson.lessonSchedule,
              date: new Date(lesson.lessonSchedule.date),
            },
          }))
          .filter(lesson => lesson.lessonSchedule.date >= today)
          .sort((a, b) => a.lessonSchedule.date - b.lessonSchedule.date)
          .slice(0, 2);
  
        const nextLessonsWithDuration = nextLessons.map(lesson => {
          const classData = studentClasses.find(
            studentClass => studentClass._id === lesson.classId
          );
  
          if (!classData) {
            console.error(`Class data not found for lesson with classId: ${lesson.classId}`);
            console.log('Available studentClasses:', studentClasses);
            return {
              ...lesson,
              duration: 'Unknown',
            };
          }
  
          return {
            ...lesson,
            duration: classData.duration,
          };
        });
  
        const nextLessonsWithTeachers = await Promise.all(nextLessonsWithDuration.map(async (lesson) => {
          const response = await getUserData(lesson.createdBy, userData.token);
          return {
            ...lesson,
            teacherFirstName: response.data.firstName,
            teacherLastName: response.data.lastName,
            teacherPhoto: response.data.profileImageUrl,
            teacherCategory: response.data.subjectArea,
          };
        }));
  
        setNextTwoLessons(nextLessonsWithTeachers);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        setLessonsError({ teacherDataError: 'Failed to load lesson data, please try again later.' });
      }
    };
  
    // Execute the function if studentLessons and studentClasses are available
    if (studentLessons.length > 0 && studentClasses.length > 0) {
      handleNextLessons();
    }
  }, [studentLessons, studentClasses, userData.token]);

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

    const previous = grouped.schedule.filter(lesson => new Date(lesson.date) < today);
    const upcoming = grouped.schedule.filter(lesson => new Date(lesson.date) >= today);
    setPreviousLessons(previous);
    setUpcomingLessons(upcoming);
  };

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
    nextTwoLessons,
    selectedId,
    setSelectedId,
    selectedClass,
    lessonsError,
    teacherData,
    isLoading,
  };
};

export default useLessonsData;