import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { getAllUsersInfo } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
// import { useNavigate } from 'react-router-dom';
import { calculateAge } from '../../../util/NotificationsUtils';

const TeacherStudents = () => {
  // const navigate = useNavigate();
  const { userData } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [studentsError, setStudentsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
            noClassesError: `You haven't added any students yet.`,
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
    if (selectedId && students.length) {
      const initialStudent = students.find(
        (student) => student._id === selectedId
      );
      setSelectedStudent(initialStudent);
    }
  }, [selectedId, students]);

  const studentsList = students.map(
    ({ _id, profileImageUrl, firstName, lastName }) => {
      const active = _id === selectedId;
      const selectedStyle = active
        ? 'flex flex-col lg:flex-row w-full justify-center items-center p-2 transition duration-300 ease-in bg-darkGreen'
        : 'flex flex-col lg:flex-row w-full justify-center items-center p-2 hover:bg-lightGreen transition duration-300 ease-in';
      return (
        <div
          key={_id}
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
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 justify-evenly pt-4 items-start mb-10 w-full h-full">
            {studentsError.noStudentsError ? (
              <div className="bg-pureWhite w-2/3 h-full flex flex-col gap-4 h-2/3 self-center sm:self-start items-center">
                <p className="px-4 font-spartan font-semibold text-center my-10 tracking-wide text-xl">
                  {studentsError.noStudentsError}
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
                        className="w-20 h-20 rounded-full object-cover"
                        alt="student image large"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold text-2xl font-spartan">
                          {selectedStudent.firstName} {selectedStudent.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm sm:text-base py-1">
                            {selectedStudent
                              ? calculateAge(selectedStudent.dateOfBirth) +
                                ' y.o.'
                              : 'Not available'}
                          </p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 ml-auto">
                        <button className="w-full sm:w-1/2 lg:w-full bg-red hover:bg-pureWhite hover:text-red h-10 hover:border-2 hover:border-red text-white font-spartan font-semibold md:text-xl rounded-lg transition duration-300 ease-in">
                          Send message
                        </button>
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
