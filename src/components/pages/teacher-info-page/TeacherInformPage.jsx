import React, { useEffect, useState } from 'react';
import { getUserData, getClassesData } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';

const TeacherInfoPage = () => {
  const { userData } = useAuth();
  const { teacherId } = useParams();
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [classes, setClasses] = useState([]);
  const [classesError, setClassesError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherAndClasses = async () => {
      try {
        const teacherData = await getUserData(teacherId, userData.token);
        setTeacherInfo(teacherData.data);

        const response = await getClassesData();
        const allClasses = response.classes;

        const myClassIds = teacherData.data.myClasses.map((id) => id);
        const filteredClasses = allClasses.filter((classItem) =>
          myClassIds.includes(classItem._id)
        );

        if (filteredClasses.length === 0) {
          setClassesError({
            noClassesError: `This teacher hasn't added any classes yet.`,
          });
        } else {
          setClasses(filteredClasses);
        }

        setIsLoading(false);
      } catch (error) {
        setClassesError({
          fetchError: 'Failed to fetch data. Please try again later.',
        });
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchTeacherAndClasses();
    } else {
      setClassesError({
        fetchError: 'No teacher data found',
      });
      setIsLoading(false);
    }
  }, [teacherId, userData]);

  if (isLoading) return <Loader />;
  if (classesError.fetchError) return <p>{classesError.fetchError}</p>;

  return (
    <div className="">
      {/* Teacher Info Section */}
      <div className="flex flex-col md:flex-row justify-center md:justify-around md:bg-lightGreen">
        <div className="flex flex-col bg-pureWhite p-4 lg:p-10 ml-4 md:ml-12 md:my-12 rounded md:w-5/12">
          <div className="flex flex-row gap-4">
            <div className="flex m-2">
              {teacherInfo?.profileImageUrl && (
                <img
                  src={teacherInfo.profileImageUrl}
                  alt={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-center font-roboto font-medium text-4xl">
                {teacherInfo?.firstName} {teacherInfo?.lastName}
              </h1>
              {teacherInfo?.subjectArea && (
                <p className="flex font-roboto text-xl">
                  {teacherInfo.subjectArea.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex mt-8 gap-4">
            <button className="font-spartan bg-red hover:bg-pureWhite hover:text-red px-4 py-1 border-2 border-transparent hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-md transition duration-300 ease-in">
              Book lesson
            </button>
            <button className="font-spartan bg-pureWhite px-4 py-1 hover:bg-red hover:text-pureWhite hover-border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
              Send Message
            </button>
          </div>
        </div>

        {/* Welcome Video Section */}
        <div className="flex flex-col justify-center mx-auto p-4 m-4 md:m-12 rounded w-full md:w-1/3 bg-lightGreen">
          {teacherInfo?.profileVideoUrl && (
            <div className="bg-lightGreen rounded ">
              <video
                className="  rounded "
                controls
                src={teacherInfo.profileVideoUrl}
                type="video/mp4"
              >
                Your browser does not support the video format.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Classes Section */}
      <div className="flex flex-col md:flex-row justify-around p-4 md:m-8">
        <div className="flex flex-col">
          <div className="w-full md:w-1/2">
            <p className="font-spartan text-center justify-center md:justify-start font-medium text-4xl p-4">
              About Me
            </p>
            <p className="font-roboto text-xl">{teacherInfo?.aboutMe}</p>
          </div>

          {/* Teacher Education and Experience */}
          {teacherInfo.education && (
            <>
              <div className="flex flex-col w-full md:w-1/2 mb-8">
                <p className="text-3xl font-spartan font-medium lg:my-4">
                  Teacher Education
                </p>
                <p className="font-roboto text-xl">{teacherInfo.education}</p>
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <p className="text-3xl font-spartan font-medium lg:my-4">
                  Teacher Experience
                </p>
                <p className="font-roboto text-xl">{teacherInfo.experience}</p>
              </div>
            </>
          )}
        </div>

        {/* Teacher's Classes */}
        <div className="flex flex-col w-full p-4 w-full md:w-1/3">
          <p className="font-spartan text-center md:justify-start font-medium text-4xl">
            Teacher's Classes
          </p>
          <div
            className="flex flex-row gap-4 my-4 overflow-x-scroll"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="flex flex-col border-darkGreen border-2 bg-pureWhite rounded w-full xl:w-[50%] mx-auto"
                  style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
                >
                  <img
                    src={classItem.classImageUrl}
                    alt={classItem.classTitle}
                    className="mb-4 h-[150px] object-cover"
                  />
                  <h3 className="text-2xl text-center font-spartan font-semibold mb-1">
                    {classItem.classTitle}
                  </h3>
                  <div className="flex flex-row justify-around">
                    <div className="text-lg text-center font-roboto">
                      <span className="font-semibold">
                        {classItem.ages.minAge} - {classItem.ages.maxAge}
                      </span>
                      <span className="font-normal block whitespace-nowrap">
                        ages
                      </span>
                    </div>
                    <div className="text-lg text-center font-roboto">
                      <span className="font-semibold">
                        {classItem.duration}
                      </span>
                      <span className="font-normal block whitespace-nowrap">
                        min
                      </span>
                    </div>
                    <div className="text-lg text-center font-roboto">
                      <span className="font-semibold">${classItem.price}</span>
                      <span className="font-normal block whitespace-nowrap">
                        per session
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">
                No classes available for this teacher.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="flex flex-col bg-pureWhite p-4 m-8 rounded">
        {teacherInfo?.profilePortfolioImages?.length > 0 ? (
          <div>
            <p className="text-3xl font-spartan text-center font-medium mb-4">
              Portfolio
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              {teacherInfo.profilePortfolioImages.map((image, index) => (
                <img
                  key={index}
                  className="w-[180px] h-[180px] w-full md:w-1/6 rounded-md"
                  src={image.url}
                  alt={`Teacher Portfolio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center font-roboto font-medium text-xl">
            No portfolio images available for this teacher.
          </p>
        )}
      </div>

      {/* Video Portfolio Section */}
      {teacherInfo?.profilePortfolioVideos?.length > 0 && (
        <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4 p-4">
          <h2 className="font-spartan font-semibold text-2xl py-2">
            Video Portfolio
          </h2>
          <div className="flex flex-wrap gap-6 w-full">
            {teacherInfo.profilePortfolioVideos.map((video) => (
              <div key={video.publicId} className="relative lg:w-2/5">
                <video aria-label="portfolio video" controls>
                  <source src={video.url} type="video/mp4" />
                  <source src={video.url} type="video/mpeg" />
                  <source src={video.url} type="video/quicktime" />
                  <source src={video.url} type="video/x-msvideo" />
                  Your browser does not support this video.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherInfoPage;
