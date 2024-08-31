import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import useLessonsData from '../../../util/LessonsService';

const HomeStudent = ({ profile, onNavigate, profileError }) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    adultName,
    profileImageUrl,
    subjectArea,
    aboutMe,
    myLessons,
  } = profile;
  
  const { isLoading, nextTwoLessons } = useLessonsData();

  let editedDateOfBirth = new Date(dateOfBirth).toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let studentAge =
    (new Date().getTime() - new Date(dateOfBirth)) /
    (24 * 3600 * 365.25 * 1000);
  
  if (isLoading) return <Loader />;
    
  return (
    <div className="flex flex-col sm:flex-row w-full flex-grow sm:justify-around mb-4">
      <div className="flex flex-col sm:w-4/12 items-center gap-4 mt-4">
        <div className="flex flex-wrap p-2 items-center justify-center gap-4">
          <img
            className="w-20 h-20 rounded-full"
            src={profileImageUrl}
            alt="user photo"
          />
          <div className="font-spartan font-semibold text-2xl text-center xl:text-left">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-center">
          <button
            onClick={onNavigate}
            className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/2 md:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in"
          >
            Edit Profile
          </button>
        </div>
        {profileError.message && <p>{profileError.message}</p>}
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite ">
          <h3 className="font-spartan font-bold text-xl">Date of birth</h3>
          <p>{editedDateOfBirth}</p>
          <h3 className="font-spartan font-bold text-xl text-center">
            Interests
          </h3>
          <p>
            {subjectArea.length > 0 ? (
              <>{subjectArea.join(' | ')}</>
            ) : (
              'Please edit your profile'
            )}
          </p>
          <h3 className="font-spartan font-bold text-xl">About</h3>
          <p className="px-2">
            {aboutMe ? aboutMe : 'Please edit your profile'}
          </p>
        </div>
        {studentAge < 16 ? (
          <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite">
            <h3 className="font-spartan font-bold text-xl">
              Parents information
            </h3>
            <p>{adultName}</p>
          </div>
        ) : null}
      </div>     
      <div className="flex flex-col w-9/12 sm:w-7/12 gap-8 mt-4 self-center sm:self-start h-full">
        <div className="sm:h-2/5 flex flex-col">
          <h2 className="font-spartan font-semibold text-2xl p-4">
            Your upcoming lessons
          </h2>
              {nextTwoLessons.length > 0 ? (
                <div className="flex gap-8">
                    {nextTwoLessons.map((lesson) => {
                      return(
                        <div
                        key={lesson._id}
                        className="bg-pureWhite w-1/3 rounded p-4"
                      >
                        <div className='flex gap-4 p-2'>
                          <img src={lesson.teacherPhoto} alt="teacher photo" className='rounded-full w-20 h-20 object-cover' />
                          <div className='flex flex-col justify-around w-2/3'>
                            <p className='font-medium'>{lesson.teacherFirstName} {lesson.teacherLastName.slice(0,1)}.</p>
                            <p>{lesson.teacherCategory.join('& ')} teacher</p>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium my-2 h-1/4">
                          {lesson.lessonTitle}
                        </h3>
                        <p className="mb-2">
                          {lesson.duration} min {lesson.type} lesson
                        </p>
                        <p className="mb-2">
                          <span className='font-medium'>Date:</span>{' '}
                          {new Date(
                            lesson.lessonSchedule.date
                          ).toLocaleString('en-US', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          })} {lesson.lessonSchedule.startTime}
                        </p>
                      </div>
                      )
})}
                </div>
              ) : (
                <p>No lessons booked yet.</p>
              )}
          {myLessons.length > 0 ? (
            <Link className="p-4 underline mt-auto" to="/dashboard/lessons">
              See more lessons
            </Link>
          ) : (
            <Link className="p-4 underline mt-auto" to="/search">
              Search classes or teachers
            </Link>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default HomeStudent;