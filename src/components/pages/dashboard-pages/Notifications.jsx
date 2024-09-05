import { useState, useEffect } from 'react';
import {
  getClassesData,
  getAllUsersInfo,
  rejectApplication,
  approveApplication,
} from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import {
  sortClassesByApplicationDate,
  sortClassesByEarliestApplicationDate,
  formatDateWithWeekday,
  formatDateWithoutWeekday,
  calculateAge,
} from '../../../util/NotificationsUtils';
import StudentNotifications from './StudentNotifications'

const Notifications = ({ socket }) => {
  const { userData } = useAuth();
  const [classes, setClasses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [classesError, setClassesError] = useState(null);
  const [applicantsError, setApplicantsError] = useState(null);

  useEffect(() => {
    if (userData.role !== 'teacher') return;

    const getTeacherClasses = async () => {
      try {
        const response = await getClassesData();
        const allClasses = response.classes || [];
        const myClassIds = userData.myClasses.map((id) => id);

        const filteredClasses = allClasses.filter(
          (classInfo) =>
            myClassIds.includes(classInfo._id) &&
            Array.isArray(classInfo.applications) &&
            classInfo.applications.length > 0
        );

        // Sort applications within each class
        const classesWithSortedApplications =
          sortClassesByApplicationDate(filteredClasses);

        // Now sort the classes based on the earliest application date
        const sortedClasses = sortClassesByEarliestApplicationDate(
          classesWithSortedApplications
        );

        setClasses(sortedClasses);
        setClassesError(null);
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setClassesError({
          message: 'Failed to fetch classes. Please try again later.',
        });
      }
    };

    getTeacherClasses();
  }, [userData]);

  useEffect(() => {
    if (userData.role !== 'teacher' || classes.length === 0) return;

    const getStudentInfo = async () => {
      try {
        const token = userData.token;
        const response = await getAllUsersInfo(token);
        const allApplicants = response || [];
        const myApplicantIds = classes.flatMap((classInfo) =>
          classInfo.applications.map((application) => application.userId)
        );

        const filteredApplicants = allApplicants.filter((response) =>
          myApplicantIds.includes(response._id)
        );

        setApplicants(filteredApplicants);
        setApplicantsError(null);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setApplicantsError({
          message: 'Failed to fetch students. Please try again later.',
        });
      }
    };

    getStudentInfo();
  }, [classes, userData]);

  const handleApprove = async (classId, applicationId) => {
    const token = userData.token;
    try {
      await approveApplication(token, classId, applicationId);
      setClasses(
        (prevClasses) =>
          prevClasses
            .map((classInfo) => ({
              ...classInfo,
              applications: classInfo.applications.filter(
                (application) => application._id !== applicationId
              ),
            }))
            .filter((classInfo) => classInfo.applications.length > 0) // Remove classes with no applications
      );

      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant._id !== applicationId)
      );

      setApplicantsError(null);
    } catch (error) {
      console.error('Error approving application:', error);
      setApplicantsError({
        message: 'Failed to approve application. Please try again later.',
      });
    }
  };

  const handleDecline = async (classId, applicationId) => {
    const token = userData.token;
    try {
      await rejectApplication(token, classId, applicationId);
      setClasses(
        (prevClasses) =>
          prevClasses
            .map((classInfo) => ({
              ...classInfo,
              applications: classInfo.applications.filter(
                (application) => application._id !== applicationId
              ),
            }))
            .filter((classInfo) => classInfo.applications.length > 0) // Remove classes with no applications
      );

      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant._id !== applicationId)
      );

      setApplicantsError(null);
    } catch (error) {
      console.error('Error rejecting application:', error);
      setApplicantsError({
        message: 'Failed to reject application. Please try again later.',
      });
    }
  };
  
  if (userData.role !== 'teacher') {
    return <StudentNotifications userData={userData}/>;
  }

  return (
    <div className="container mt-10">
      {classesError && <p className="text-red">{classesError.message}</p>}
      <div className="flex flex-col gap-6 mt-10 m-5 md:m-10">
        {classes.length > 0 ? (
          classes.map((classInfo) => (
            <div
              key={classInfo._id}
              className="border rounded-lg border-gray p-5 bg-pureWhite"
            >
              <h2 className="font-roboto font-medium text-2xl mb-4">
                {classInfo.classTitle}
              </h2>
              <hr className="my-4 border-gray" />
              {classInfo.applications.map((application) => {
                const applicantDetails = applicants.find(
                  (user) => user._id === application.userId
                );
                return (
                  <div
                    key={application._id}
                    className="flex flex-row items-start mb-4 border-b border-gray pb-4"
                  >
                    <div className="flex w-1/4 justify-center items-center">
                      <img
                        className="rounded-lg w-30 h-35 "
                        src={
                          applicantDetails
                            ? applicantDetails.profileImageUrl
                            : '/default-profile.png'
                        }
                        alt={
                          applicantDetails
                            ? `${applicantDetails.firstName} ${applicantDetails.lastName}`
                            : 'Unknown'
                        }
                      />
                    </div>
                    <div className="flex flex-col w-2/4 px-4">
                      <p>
                        <strong>Student:</strong>{' '}
                        {applicantDetails
                          ? `${applicantDetails.firstName} ${applicantDetails.lastName}`
                          : 'Unknown'}
                      </p>
                      <p>
                        <strong>Age:</strong>{' '}
                        {applicantDetails
                          ? calculateAge(applicantDetails.dateOfBirth)
                          : 'Unknown'}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{' '}
                        {applicantDetails
                          ? formatDateWithoutWeekday(
                              applicantDetails.dateOfBirth
                            )
                          : 'Unknown'}
                      </p>
                      {applicantDetails?.adultName && (
                        <p>
                          <strong>Parent:</strong> {applicantDetails.adultName}
                        </p>
                      )}
                      <p>
                        <strong>Email:</strong>{' '}
                        {applicantDetails ? applicantDetails.email : 'Unknown'}
                      </p>
                      <p>
                        <strong>The requested date:</strong>{' '}
                        {formatDateWithWeekday(application.date)}
                      </p>
                      <p>
                        <strong>The requested time:</strong>{' '}
                        {application.startTime}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4 px-4">
                      <button
                        className="bg-darkGreen text-white px-4 py-2 rounded mb-2 font-spartan font-semibold "
                        onClick={() =>
                          handleApprove(classInfo._id, application._id)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red text-white px-4 py-2 rounded font-spartan font-semibold "
                        onClick={() =>
                          handleDecline(classInfo._id, application._id)
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold mb-4">
              No Applications for Your Classes
            </h1>
            <p className="text-lg text-gray mb-6">
              No one has applied for your classes yet. Don't worry, it's normal!
              Try updating your class and profile information.
            </p>
            <h2 className="text-xl font-semibold mb-4">
              Some Recommendations:
            </h2>
            <ul className="text-lg list-disc list-inside text-gray">
              <li>Enhance your class information with more details.</li>
              <li>Add an eye-catching image to your class listing.</li>
              <li>
                Ensure your pricing is competitive and reflects the value
                offered.
              </li>
              <li>
                Update your profile with additional details about yourself.
              </li>
              <li>Include a welcoming video on your profile page.</li>
              <li>Add engaging images and videos to your portfolio.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
