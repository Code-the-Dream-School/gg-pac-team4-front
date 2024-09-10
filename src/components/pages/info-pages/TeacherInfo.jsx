import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherInfo = ({ teacherInfo }) => {
  const [showFullExperience, setShowFullExperience] = useState(false);
  const navigate = useNavigate();

  const handleToggleExperience = () => {
    setShowFullExperience(!showFullExperience);
  };
  const handleProfileRedirect = () => {
    navigate(`/teacher-info/${teacherInfo._id}`);
  };
  const truncatedLength = 100;
  const shouldShowReadMore =
    teacherInfo.experience && teacherInfo.experience.length > truncatedLength;

  return (
    <div className="mt-6">
      <p className="text-3xl font-spartan font-medium mb-4">Meet the Teacher</p>
      <div className="flex flex-row">
        {teacherInfo.profileImageUrl && (
          <img
            src={teacherInfo.profileImageUrl}
            alt={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div className="flex text-center items-center justify-center pl-4">
          <p className="font-roboto font-medium text-xl">
            {`${teacherInfo.firstName || ''} ${teacherInfo.lastName || ''}`}
          </p>
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-4">
        {teacherInfo.profileImageUrl && (
          <button
            onClick={handleProfileRedirect}
            className="bg-pureWhite py-1 px-4 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red"
          >
            Profile
          </button>
        )}
        <button
          onClick={() => {
            window.location.href = `mailto:${teacherInfo.email}?subject=Message from Student`;
          }}
          className="bg-pureWhite py-1 px-4 hover:bg-red hover:text-pureWhite hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red"
        >
          Send a Message
        </button>
      </div>
      <div className="mt-6">
        {teacherInfo.education && (
          <>
            <p className="text-3xl font-spartan font-medium lg:my-4">
              Teacher education and experience
            </p>
            <div className="flex flex-row gap-2">
              <p className="font-roboto text-xl">{teacherInfo.education}</p>
            </div>
          </>
        )}
        {teacherInfo.experience && (
          <>
            <p className="font-roboto leading-7 text-xl pt-4 md:w-2/3">
              {showFullExperience
                ? teacherInfo.experience
                : `${teacherInfo.experience.substring(0, truncatedLength)}...`}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={handleToggleExperience}
                className="text-black font-semibold underline hover:text-darkGreen"
              >
                {showFullExperience ? 'Show Less' : 'Read More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherInfo;
