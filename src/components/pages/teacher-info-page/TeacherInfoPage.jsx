import React, { useEffect, useState } from 'react';
import { getUserData, getClassesData } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';

const TeacherInfo = ({ teacherInfo }) => {
  return (
    <div className="flex flex-col md:flex-row justify-around bg-lightGreen">
      <div className="flex flex-col bg-pureWhite p-4 m-8 rounded-md w-1/2">
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
            <h1 className="text-center font-roboto text-3xl font-medium">
              {teacherInfo?.firstName} {teacherInfo?.lastName}
            </h1>
          </div>
        </div>

        <div className="flex mt-4 gap-4 ">
          <button className="font-spartan bg-red hover:bg-pureWhite hover:text-red px-4 py-1 border-2 border-transparent hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-md transition duration-300 ease-in">
            Book lesson
          </button>
          <button className="font-spartan bg-pureWhite px-4 py-1 hover:bg-red hover:text-pureWhite hover-border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
            Send Message
          </button>
        </div>
      </div>

      <div className="flex flex-col bg-pureWhite p-4 m-8 rounded-md w-1/2">
        {teacherInfo?.profilePortfolioVideos &&
        teacherInfo.profilePortfolioVideos.length > 0 ? (
          <div className="">
            <video
              className="w-full"
              controls
              src={teacherInfo.profilePortfolioVideos[0].url}
              type="video/mp4"
            ></video>
          </div>
        ) : (
          <p className="text-center font-roboto font-medium text-xl">
            No video available for this teacher.
          </p>
        )}
      </div>
    </div>
  );
};

const TeacherInfoPage = () => {
  const { userData } = useAuth();
  const { teacherId } = useParams();
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherAndClasses = async () => {
      try {
        const teacherData = await getUserData(teacherId, userData.token);
        setTeacherInfo(teacherData.data);

        const fetchClasses = await getClassesData({
          teacherId: teacherData.data._id,
        });
        setClasses(fetchClasses.classes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchTeacherAndClasses();
    } else {
      setError('User needs to be logged in.');
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
      setError('Failed to load more classes');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container m-auto w-11/12">
      {teacherInfo && <TeacherInfo teacherInfo={teacherInfo} />}
      <div className="flex flex-row">
        <div className="w-1/2 pt-10">
          <p className="font-spartan font-medium text-4xl">About Me</p>
          <p className="font-roboto text-xl">{teacherInfo?.aboutMe}</p>
        </div>
        <div className="w-1/3 m-6">
          <p className="text-4xl font-spartan font-medium mb-4">
            Teacher's Classes
          </p>
          <div
            className="flex flex-row gap-4 mb-4 overflow-x-scroll"
            onScroll={handleScroll}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="flex flex-col bg-pureWhite p-4 rounded-lg shadow-lg"
                  style={{
                    scrollSnapAlign: 'start',
                    width: 'calc(50% - 16px)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={classItem.classImageUrl}
                    alt={classItem.classTitle}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h3 className="text-2xl font-spartan font-semibold mb-2">
                    {classItem.classTitle}
                  </h3>
                  <p className="text-lg font-spartan font-semibold">
                    ${classItem.price} per session
                  </p>
                  <p className="text-lg font-spartan font-semibold">
                    ${classItem.price} per session
                  </p>
                </div>
              ))
            ) : (
              <p>This teacher hasn't added any classes yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-pureWhite p-4 m-8 rounded-md">
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
