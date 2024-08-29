import { getClassesData, getUserData } from './DataBaseRequests';
import { useEffect, useState } from 'react';

import { useAuth } from '../AuthProvider';

const useLessonsData = () => {
    const [lessons, setLessons] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [selectedLesson, setSelectedLesson] = useState([]);
    const [lessonsError, setLessonsError] = useState({});
    const [teacherData, setTeacherData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useAuth();
    
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
          if (filteredData.length > 0) {
            setLessons(filteredData);
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
    }, [selectedId, lessons]);

    console.log(selectedLesson);

    useEffect(() => {
      if (selectedLesson && selectedLesson.length > 0) {
        const getTeacherData = async () => {
          try {
            const response = await getUserData(
              selectedLesson[0].createdBy,
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
    }, [selectedLesson, userData.token]);
    
    return {
        lessons,
        selectedId,
        setSelectedId,
        selectedLesson,
        lessonsError,
        teacherData,
        isLoading,
      };
};

export default useLessonsData;