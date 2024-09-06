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
        console.error('Error fetching data:', error);
        setClassesError({
          fetchError: 'Failed to fetch data. Please try again later.',
        });
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchTeacherAndClasses();
    } else {
      console.error('No teacher data found');
    }
  }, [teacherId, userData]);

  const handleScroll = (e) => {
    const { scrollLeft, clientWidth, scrollWidth } = e.target;
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      loadMoreClasses();
    }
  };

  const loadMoreClasses = async () => {
    try {
      const addClasses = await getClassesData({
        teacherId: teacherInfo._id,
        offset: classes.length,
      });
      setClasses((prevClasses) => [...prevClasses, ...addClasses.classes]);
    } catch (err) {
      setClassesError('Failed to load more classes');
    }
  };

  if (isLoading) return <Loader />;
  if (classesError.fetchError) return <p>{classesError.fetchError}</p>;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-center md:justify-around md:bg-lightGreen">
        <div className="flex flex-col bg-pureWhite p-4 lg:p-10 ml-4 md:ml-12 md:my-12 rounded md:w-1/2">
          <div className="flex flex-row gap-4">
            <div className="flex m-2">
              {teacherInfo?.profileImageUrl && (
                <img
                  src={teacherInfo.profileImageUrl}
                  alt={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
                  className="w-20 h-20 rounded-full"
                />
              )}
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-center font-roboto font-medium">
                {teacherInfo?.firstName} {teacherInfo?.lastName}
              </h1>
            </div>
          </div>

          <div className="flex mt-4 gap-4">
            <button className="font-spartan bg-red hover:bg-pureWhite hover:text-red px-4 py-1 border-2 border-transparent hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-md transition duration-300 ease-in">
              Book lesson
            </button>
            <button className="font-spartan bg-pureWhite px-4 py-1 hover:bg-red hover:text-pureWhite hover-border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
              Send Message
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-pureWhite m-4 md:m-12 rounded w-10/12 md:w-1/2 bg-lightGreen">
          {teacherInfo?.profilePortfolioVideos &&
            teacherInfo.profilePortfolioVideos.length > 0 && (
              <div className="bg-lightGreen rounded">
                <video
                  className="w-full rounded"
                  controls
                  src={teacherInfo.profilePortfolioVideos[0].url}
                  type="video/mp4"
                >
                  Your browser does not support the video format.
                </video>
              </div>
            )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-around p-4 m-8">
        <div className="w-full md:w-1/2">
          <p className="font-spartan text-center justify-center md:justify-start font-medium text-4xl p-4">
            About Me
          </p>
          <p className="font-roboto text-xl">{teacherInfo?.aboutMe}</p>
        </div>

        <div className="flex flex-col w-full p-4 md:w-1/3">
          <p className="font-spartan text-center md:justify-start font-medium text-4xl">
            Teacher's classes
          </p>

          <div
            className="flex flex-row gap-4 my-4 overflow-x-scroll"
            style={{ scrollSnapType: 'x mandatory' }}
            onScroll={handleScroll}
          >
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="flex flex-col border-darkGreen border-2 bg-pureWhite rounded w-full md:w-[275px] mx-auto"
                  style={{
                    scrollSnapAlign: 'start',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={classItem.classImageUrl}
                    alt={classItem.classTitle}
                    className="mb-4 h-[150px]  object-cover"
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
                      </span>{' '}
                      <span className="font-normal block whitespace-nowrap">
                        min
                      </span>
                    </div>
                    <div className="text-lg text-center font-roboto">
                      <span className="font-semibold">${classItem.price}</span>{' '}
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
      <div className="flex flex-col bg-pureWhite p-4 m-8 rounded">
        {teacherInfo?.profilePortfolioImages &&
        teacherInfo.profilePortfolioImages.length > 0 ? (
          <div>
            <p className="text-3xl font-spartan text-center font-medium mb-4">
              Portfolio
            </p>
            <img
              className="w-1/6 rounded-md"
              src={teacherInfo.profilePortfolioImages[0].url}
              alt="Teacher Portfolio"
            />
          </div>
        ) : (
          <p className="text-center font-roboto font-medium text-xl">
            No portfolio images available for this teacher.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeacherInfoPage;
