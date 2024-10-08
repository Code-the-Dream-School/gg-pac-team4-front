import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import {
  getAllUsersInfo,
  getAllStudentLessons,
  getClassesData,
  deleteLesson,
} from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
  calculateAge,
  formatDateWithoutWeekday,
} from '../../../util/NotificationsUtils';
import { formatDateWithWeekday } from '../../../util/NotificationsUtils';
import { v4 as uuidv4 } from 'uuid';

const TeacherStudents = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [studentsError, setStudentsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [studentLessons, setStudentLessons] = useState([]);
  const [classTitles, setClassTitles] = useState([]);
  const [classesError, setClassesError] = useState({});
  const [lessonsError, setLessonsError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const getTeacherStudents = async () => {
      const token = userData.token;
      try {
        const allUsers = await getAllUsersInfo(token);
        const myStudents = userData.myStudents;
        const filteredStudents = allUsers.filter((user) =>
          myStudents.includes(user._id)
        );
        if (filteredStudents.length === 0) {
          setIsLoading(false);
          setStudentsError({
            noStudentsError: `You haven't added any students yet.`,
          });
        } else {
          setStudents(filteredStudents);
          setSelectedId(filteredStudents[0]._id);
          setStudentsError({ fetchError: '', noStudentsError: '' });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching students data:', error);
        setStudentsError({
          fetchError: 'Failed to fetch students. Please try again later.',
        });
      }
    };
    getTeacherStudents();
  }, [userData]);

  useEffect(() => {
    const getClassesInfo = async () => {
      try {
        const response = await getClassesData();
        const allClasses = response.classes;
        const myClassIds = userData.myClasses.map((id) => id);
        const filteredClasses = allClasses.filter((classes) =>
          myClassIds.includes(classes._id)
        );
        const myClassesTitleAndId = filteredClasses.map((classItem) => ({
          title: classItem.classTitle,
          id: classItem._id,
        }));
        setClassTitles(myClassesTitleAndId);
        setClassesError({});
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setClassesError({
          fetchError: 'Failed to fetch my classes. Please try again later.',
        });
      }
    };
    getClassesInfo();
  }, [userData]);

  useEffect(() => {
    const getLessonsInfo = async () => {
      if (!selectedId) return;

      const token = userData.token;
      try {
        const response = await getAllStudentLessons(token, selectedId);
        const allStudentLessons = response.data.lessons;
        // Group lessons by classId
        const groupedLessons = allStudentLessons.reduce((acc, lesson) => {
          const { classId } = lesson;
          if (!acc[classId]) {
            acc[classId] = [];
          }
          acc[classId].push(lesson);
          return acc;
        }, {});
        // Sort lessons in each group by date
        for (const classId in groupedLessons) {
          groupedLessons[classId].sort(
            (a, b) =>
              new Date(a.lessonSchedule.date) - new Date(b.lessonSchedule.date)
          );
        }
        setStudentLessons(groupedLessons);
        setLessonsError({});
      } catch (error) {
        console.error('Error fetching lessons data:', error);
        setLessonsError({
          fetchError:
            'Failed to fetch my student lessons. Please try again later.',
        });
      }
    };

    getLessonsInfo();
  }, [selectedId]);

  const selectedStudent = selectedId
    ? students.find((student) => student._id === selectedId)
    : null;

  const handleAddNewLesson = () => {
    navigate('/dashboard/add-lesson', {
      state: {
        selectedStudentId: selectedStudent._id,
      },
    });
  };

  const handleEdit = async (lesson) => {
    navigate(`/dashboard/edit-lesson/${lesson}`, {
      state: {
        selectedStudentId: selectedStudent._id,
        lessonId: lesson,
      },
    });
  };

  const handleDelete = async (studentId, lessonId) => {
    setIsLoading(true); // Start loading
    const token = userData.token;
    try {
      await deleteLesson(token, studentId, lessonId);
      setStudentLessons((prevLessons) => {
        const updatedLessons = { ...prevLessons };
        // Filter lessons by class and lesson id
        for (const classId in updatedLessons) {
          updatedLessons[classId] = updatedLessons[classId].filter(
            (lesson) => lesson._id !== lessonId
          );
          if (updatedLessons[classId].length === 0) {
            delete updatedLessons[classId];
          }
        }
        return updatedLessons;
      });
      setLessonsError({});
    } catch (error) {
      console.error('Error deleting lesson:', error);
      setLessonsError({
        message: 'Failed to delete lesson. Please try again later.',
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const studentsList = students.map(
    ({ _id, profileImageUrl, firstName, lastName }) => {
      const uniqueKey = uuidv4();
      const active = _id === selectedId;
      const selectedStyle = active
        ? 'flex flex-col lg:flex-row w-full justify-center items-center p-2 transition duration-300 ease-in bg-darkGreen'
        : 'flex flex-col lg:flex-row w-full justify-center items-center p-2 hover:bg-lightGreen transition duration-300 ease-in';
      return (
        <div
          key={uniqueKey}
          onClick={() => setSelectedId(_id)}
          className={selectedStyle}
        >
          <img
            src={profileImageUrl}
            className="w-20 h-20 rounded-full object-cover"
            alt="student image small"
          />
          <p className="font-spartan font-semibold text-lg text-center w-full">
            {firstName} {lastName}
          </p>
        </div>
      );
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {studentsError.fetchError && (
            <p className="text-red-500 text-xl font-bold text-center">
              {studentsError.fetchError}
            </p>
          )}
          {classesError.fetchError && (
            <p className="text-red-500 text-xl font-bold text-center">
              {classesError.fetchError}
            </p>
          )}
          {lessonsError.fetchError && (
            <p className="text-red-500 text-xl font-bold text-center">
              {lessonsError.fetchError}
            </p>
          )}
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 justify-evenly pt-4 items-start mb-10 w-full h-full">
            {studentsError.noStudentsError ? (
              <div className="bg-pureWhite w-2/3 flex flex-col gap-4 h-2/3 self-center sm:self-start items-center">
                <p className="px-4 font-spartan font-semibold text-center my-10 tracking-wide text-xl">
                  {studentsError.noStudentsError}
                  <br />
                  <br />

                  <button
                    onClick={() => navigate('/dashboard/applications')}
                    className="bg-pureWhite py-1 w-4/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red my-4"
                  >
                    Please check your Applications
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start">
                  <h1 className="text-black font-semibold text-2xl font-spartan text-center py-4">
                    My Students
                  </h1>
                  {studentsList}
                </div>
                {selectedStudent && (
                  <div className="bg-pureWhite w-10/12 sm:w-3/5 flex flex-col gap-4 pb-6 self-center sm:self-start items-center rounded">
                    <div className="mt-10 flex flex-col lg:flex-row w-full gap-4 lg:gap-8 p-4">
                      <img
                        src={selectedStudent.profileImageUrl}
                        className="w-24 h-24 rounded-full object-cover"
                        alt="student image large"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold text-2xl font-spartan">
                          {selectedStudent.firstName} {selectedStudent.lastName}
                          ,{' '}
                          {selectedStudent
                            ? calculateAge(selectedStudent.dateOfBirth) +
                              ' y.o.'
                            : 'Not available'}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm sm:text-base py-1">
                            Email: {selectedStudent.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm sm:text-base py-1">
                            Date of Birth:{' '}
                            {formatDateWithoutWeekday(
                              selectedStudent.dateOfBirth
                            )}
                          </p>
                        </div>
                        {selectedStudent.adultName && (
                          <div className="flex items-center gap-2">
                            <p className="text-sm sm:text-base py-1">
                              Parent: {selectedStudent.adultName}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="lg:w-1/4 ml-auto">
                      <div>
                        <button
                          onClick={() => {
                            window.location.href = `mailto:${selectedStudent.email}?subject=Message from Teacher`;
                          }}
                          className="w-full sm:w-1/2 lg:w-full bg-red hover:bg-pureWhite hover:text-red h-10 hover:border-2 hover:border-red text-white font-spartan font-semibold md:text-xl rounded-lg transition duration-300 ease-in"
                        >
                          Send Message
                        </button>
                      </div>
                        <div className="mt-8">
                          <button
                            onClick={handleAddNewLesson}
                            className="w-full sm:w-1/2 lg:w-full bg-pureWhite hover:bg-red hover:text-pureWhite h-10 hover:border-2 hover:border-red text-red font-spartan font-semibold md:text-xl rounded-md border-2 border-red"
                          >
                            Add a new lesson
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 w-full">
                      <h2 className="text-2xl font-spartan font-semibold ml-4">
                        Classes & Lessons:
                      </h2>
                      <div className="p-4">
                        {Object.keys(studentLessons).map((classId) => (
                          <div key={classId} className="mb-8">
                            <h2 className="text-lg font-bold mb-4 text-center">
                              {
                                classTitles.find(
                                  (classItem) => classItem.id === classId
                                )?.title
                              }
                            </h2>
                            <div className="overflow-x-auto">
                              <div className="min-w-full">
                                <div className="hidden lg:flex bg-lightGreen text-lg border-t font-medium rounded-t-lg p-2">
                                  <div className="flex-1 p-2 text-center">
                                    Lesson title
                                  </div>
                                  <div className="flex-1 p-2 text-center">
                                    Description
                                  </div>
                                  <div className="flex-1 p-2 text-center">
                                    Date
                                  </div>
                                  <div className="flex-1 p-2 text-center">
                                    Start time
                                  </div>
                                  <div className="flex-1 p-2 text-center">
                                    Type
                                  </div>
                                  <div className="flex-1 p-2 text-center">
                                    Additional info
                                  </div>
                                  <div className="flex-1 p-2 text-center"></div>
                                </div>
                                {studentLessons[classId].map((lesson) => (
                                  <div
                                    key={lesson._id}
                                    className="flex flex-col lg:flex-row bg-white"
                                  >
                                    <div className="flex-1 p-2 text-center">
                                      {lesson.lessonTitle}
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      {lesson.lessonDescription}
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      <div>
                                        {formatDateWithWeekday(
                                          lesson.lessonSchedule.date
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      {lesson.lessonSchedule.startTime}
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      {lesson.type}
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      {lesson.hometask}
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                      <button
                                        onClick={() => handleEdit(lesson._id)}
                                        className="ml-1 w-2/3 bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDelete(selectedId, lesson._id)
                                        }
                                        className="ml-1 mt-3 w-2/3 bg-pureWhite text-red hover:bg-red hover:text-pureWhite border-2 border-red font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TeacherStudents;
