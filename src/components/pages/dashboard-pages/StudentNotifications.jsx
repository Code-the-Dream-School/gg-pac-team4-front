import { useState, useEffect } from 'react';
import { getClassesData } from '../../../util/DataBaseRequests';
import {
  sortClassesByApplicationDate,
  sortClassesByEarliestApplicationDate,
  formatDateWithWeekday,
} from '../../../util/NotificationsUtils';

const StudentNotifications = ({ userData }) => {
  const [classesWithApplications, setClassesWithApplications] = useState([]);
  const [classesError, setClassesError] = useState(null);

  useEffect(() => {
    const fetchClassesWithMyApplications = async () => {
      if (!userData || !userData._id) {
        console.error('User data is not available.');
        return;
      }

      try {
        const response = await getClassesData();
        const allClasses = response.classes || [];
        const userId = userData._id;

        // Filter classes where userId is in the applications
        const filteredClassesWithApplications = allClasses.filter((classInfo) =>
          classInfo.applications.some(
            (application) => application.userId === userId
          )
        );

        // Sort applications within each class
        const classesWithSortedApplications = sortClassesByApplicationDate(
          filteredClassesWithApplications
        );

        // Now sort the classes based on the earliest application date
        const sortedClasses = sortClassesByEarliestApplicationDate(
          classesWithSortedApplications
        );

        // Set state with the filtered classes
        setClassesWithApplications(sortedClasses);
        setClassesError(null);
      } catch (error) {
        console.error('Error fetching classes data:', error);
        setClassesError({
          message: 'Failed to fetch classes. Please try again later.',
        });
      }
    };

    fetchClassesWithMyApplications();
  }, [userData]);

  const determineApplicationStatus = (classInfo, userId) => {
    const isApplicationInClass = classInfo.applications.some(
      (application) => application.userId === userId
    );

    if (isApplicationInClass) {
      return 'Pending';
    }
  };


  const handleDecline = async (classId, applicationId) => {
    try {
    console.log(classId, applicationId)
    } catch (error) {
      console.error('Error rejecting application:', error);
      setApplicantsError({
        message: 'Failed to reject application. Please try again later.',
      });
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 md:px-10">
      <h1 className="text-red font-bold text-2xl sm:text-4xl font-spartan uppercase text-left mb-8">
        Your Applications:
      </h1>
      {classesError && (
        <p className="text-red-500 text-center">{classesError.message}</p>
      )}
      <div className="flex flex-col gap-6 mt-10 m-5 md:m-10">
        {classesWithApplications.length > 0 ? (
          classesWithApplications.map((classInfo) =>
            classInfo.applications
              .filter((application) => application.userId === userData._id)
              .map((application) => (
                <div
                  key={application._id}
                  className="border rounded-lg border-gray p-5 bg-pureWhite flex items-start"
                >
                  <div className="flex-shrink-0 w-1/4 md:w-1/6">
                    <img
                      src={
                        classInfo.classImageUrl || '/default-class-image.jpg'
                      }
                      alt={classInfo.classTitle}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <h2 className="font-roboto font-medium text-2xl mb-4">
                      {classInfo.classTitle}
                    </h2>
                    <hr className="my-4 border-gray" />
                    <div className="flex flex-col">
                      <p>
                        <strong>Requested Date:</strong>{' '}
                        {formatDateWithWeekday(application.date)}
                      </p>
                      <p>
                        <strong>Requested Time:</strong> {application.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <p
                      className={`font-medium text-lg ${determineApplicationStatus(classInfo, userData._id) === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}
                    >
                      {determineApplicationStatus(classInfo, userData._id)}
                    </p>
                    <button
                      onClick={() =>
                        handleDecline(classInfo._id, application._id)
                      }
                      className="mt-12 px-4 py-2 bg-red text-white rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
          )
        ) : (
          <p className="text-center">No applications found for your account.</p>
        )}
      </div>
    </div>
  );
};

export default StudentNotifications;
