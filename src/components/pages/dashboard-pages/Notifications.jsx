import { useState, useEffect } from 'react';
import { getClassesData, getAllUsersInfo } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';

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
        const myClassIds = userData.myClasses.map(id => id);

        const filteredClasses = allClasses.filter(classInfo =>
          myClassIds.includes(classInfo._id) &&
          Array.isArray(classInfo.applications) &&
          classInfo.applications.length > 0
        );

        // Sort applications within each class
        const classesWithSortedApplications = sortClassesByApplicationDate(filteredClasses);

        // Now sort the classes based on the earliest application date
        const sortedClasses = sortClassesByEarliestApplicationDate(classesWithSortedApplications);

        setClasses(sortedClasses);
        setClassesError(null);
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setClassesError({ message: 'Failed to fetch classes. Please try again later.' });
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
        const myApplicantIds = classes.flatMap(classInfo =>
          classInfo.applications.map(application => application.userId)
        );

        const filteredApplicants = allApplicants.filter(response =>
          myApplicantIds.includes(response._id)
        );

        setApplicants(filteredApplicants);
        setApplicantsError(null);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setApplicantsError({ message: 'Failed to fetch students. Please try again later.' });
      }
    };

    getStudentInfo();
  }, [classes, userData]);

  const sortClassesByApplicationDate = (classes) => {
    return classes.map(classInfo => ({
      ...classInfo,
      applications: classInfo.applications.slice().sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)) // Descending
    }));
  };

  const sortClassesByEarliestApplicationDate = (classes) => {
    return classes.slice().sort((a, b) => {
      const earliestDateA = a.applications.length > 0 ? new Date(Math.min(...a.applications.map(app => new Date(app.appliedAt)))) : new Date();
      const earliestDateB = b.applications.length > 0 ? new Date(Math.min(...b.applications.map(app => new Date(app.appliedAt)))) : new Date();

      return earliestDateB - earliestDateA; // Descending order
    });
  };

  const formatDateWithWeekday = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDateWithoutWeekday = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleApprove = (classId, applicationId) => {
    console.log('Approved:', classId, applicationId);
  };

  const handleDecline = (classId, applicationId) => {
    console.log('Declined:', classId, applicationId);
  };

  if (userData.role !== 'teacher') {
    return <p>Coming soon...</p>;
  }

  return (
    <div className="container mt-10">
      <h1 className="text-red font-bold text-2xl sm:text-4xl font-spartan uppercase">
        New applications:
      </h1>
      {classesError && <p className="text-red-500">{classesError.message}</p>}
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
                        src={applicantDetails ? applicantDetails.profileImageUrl : '/default-profile.png'}
                        alt={applicantDetails ? `${applicantDetails.firstName} ${applicantDetails.lastName}` : 'Unknown'}
                      />
                    </div>
                    <div className="flex flex-col w-2/4 px-4">
                      <p><strong>Student:</strong> {applicantDetails ? `${applicantDetails.firstName} ${applicantDetails.lastName}` : 'Unknown'}</p>
                      <p><strong>Age:</strong> {applicantDetails ? calculateAge(applicantDetails.dateOfBirth) : 'Unknown'}</p>
                      <p><strong>Date of Birth:</strong> {applicantDetails ? formatDateWithoutWeekday(applicantDetails.dateOfBirth) : 'Unknown'}</p>
                      {applicantDetails?.adultName && (
                        <p><strong>Parent:</strong> {applicantDetails.adultName}</p>
                      )}
                      <p><strong>Email:</strong> {applicantDetails ? applicantDetails.email : 'Unknown'}</p>
                      <p><strong>The requested date:</strong> {formatDateWithWeekday(application.date)}</p>
                      <p><strong>The requested time:</strong> {application.startTime}</p>
                    </div>
                    <div className="flex flex-col w-1/4 px-4">
                      <button
                        className="bg-darkGreen text-white px-4 py-2 rounded mb-2 font-spartan font-semibold "
                        onClick={() => handleApprove(classInfo._id, application._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red text-white px-4 py-2 rounded font-spartan font-semibold "
                        onClick={() => handleDecline(classInfo._id, application._id)}
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
          <p>No applications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
