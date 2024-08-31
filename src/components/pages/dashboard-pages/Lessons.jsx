import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import ScrollToTop from '../../layouts/ScrollToTop';
import useLessonsData from '../../../util/LessonsService';

const Lessons = () => {
  const {
    studentClasses,
    groupedLessons,
    previousLessons,
    upcomingLessons,
    selectedId,
    setSelectedId,
    selectedClass,
    lessonsError,
    teacherData,
    isLoading,
  } = useLessonsData();

  const classesList = studentClasses.map(
    ({ _id, classImageUrl, classTitle }) => {
      const active = _id === selectedId;
      const selectedStyle = active
        ? 'flex flex-col lg:flex-row w-full justify-center items-center p-2 transition duration-300 easy-in bg-darkGreen'
        : 'flex flex-col lg:flex-row w-full  justify-center items-center p-2 hover:bg-lightGreen transition duration-300 easy-in';
      return (
        <div
          key={_id}
          onClick={() => setSelectedId(_id)}
          className={selectedStyle}
        >
          <img
            src={classImageUrl}
            className="w-32 md:w-24 rounded aspect-[4/3]"
            alt="class image small"
          />
          <p className="font-spartan font-semibold sm:text-lg text-center w-full">
            {classTitle}
          </p>
        </div>
      );
    }
  );

  const renderLessons = (lessonList, title) => {
    return (
      <div className="w-full">
        <h2 className="font-medium text-lg lg:text-xl px-6">{title}</h2>
        <div className="overflow-x-auto mt-2 rounded">
          <div className="min-w-full bg-white">
            {/* header */}
            <div className="hidden lg:flex bg-lightGreen text-lg font-medium">
              <div className="p-2 flex-1 text-center">Lesson title</div>
              <div className="p-2 flex-1 text-center">Description</div>
              <div className="p-2 flex-1 text-center">Date</div>
              <div className="p-2 flex-1 text-center">Start time</div>
              <div className="p-2 flex-1 text-center">Hometask</div>
              <div className="p-2 flex-1 text-center">Lesson files</div>
            </div>
            {/* rows */}
            <div>
              {lessonList.map((lesson, index) => (
                <div
                  key={index}
                  className="lg:flex text-xs md:text-sm text-center hover:bg-gray-50"
                >
                  {/* small screens */}
                  <div className="lg:hidden flex flex-col border-t border-lightGreen g-2">
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Lesson title:</div>
                      <div>{lesson.lessonTitle}</div>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Description:</div>
                      <div>{lesson.lessonDescription}</div>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Date:</div>
                      <div>{new Date(lesson.date).toLocaleDateString('en-US', {
                              timeZone: 'UTC',
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })}</div>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Start time:</div>
                      <div>{lesson.startTime}</div>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Hometask:</div>
                      <div>{lesson.hometask || 'None'}</div>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="font-medium">Lesson files:</div>
                      <div>{lesson.lessonFiles || 'No files'}</div>
                    </div>
                  </div>

                  {/* large screens */}
                  <div className="hidden lg:flex flex-1 border-t border-lightGreen">
                    <div className="p-2 flex-1">{lesson.lessonTitle}</div>
                    <div className="p-2 flex-1">{lesson.lessonDescription}</div>
                    <div className="p-2 flex-1">
                      {new Date(lesson.date).toLocaleDateString('en-US', {
                              timeZone: 'UTC',
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })}
                    </div>
                    <div className="p-2 flex-1">{lesson.startTime}</div>
                    <div className="p-2 flex-1">
                      {lesson.hometask || 'None'}
                    </div>
                    <div className="p-2 flex-1">
                      {lesson.lessonFiles || 'No files'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {lessonsError.fetchError && (
        <div className="bg-pureWhite w-9/12 flex flex-col justify-center items-center rounded mt-4 h-1/3">
          <p className="text-red text-xl font-bold">
            {lessonsError.fetchError}
          </p>
          <Link className="p-4 underline" to="/search">
            Search classes or teachers
          </Link>
        </div>
      )}
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly md:p-4 items-start mb-10">
        {studentClasses.length > 0 && (
          <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start rounded">
            <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
              My lessons
            </h1>
            {classesList}
          </div>
        )}
        {teacherData && !lessonsError.teacherDataError ? (
          <div className="bg-pureWhite w-full sm:w-3/5 flex flex-col gap-4 p-6 self-center md:self-start items-center rounded">
            <div className="flex w-full justify-between p-6 flex-col lg:flex-row gap-4">
              <div className="flex lg:w-1/2 justify-around gap-4">
                <img
                  src={teacherData.profileImageUrl}
                  className="w-20 h-20 lg:w-32 lg:h-32 rounded-full"
                  alt="teacher photo"
                />
                <div className="flex flex-col justify-between w-1/2">
                  <p className="font-spartan font-semibold text-lg sm:text-2xl lg:text-3xl">
                    {teacherData.firstName} {teacherData.lastName}
                  </p>
                  <h2 className="font-spartan font-medium text-lg sm:text-2xl">
                    {selectedClass[0].classTitle}
                  </h2>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center lg:justify-end">
                <button className="w-full sm:w-1/2 lg:w-full bg-red hover:bg-pureWhite hover:text-red h-10 hover:border-2 hover:border-red text-white font-spartan font-semibold md:text-xl rounded-lg transition duration-300 easy-in">
                  Send message
                </button>
              </div>
            </div>
            <div className="self-start w-full">
              <p className="lg:text-lg px-6">{selectedClass[0].description}</p>
            </div>

            {/* <div className='self-start'>
              <h3 className="font-medium text-xl self-start px-6">Homework and other study materials</h3>
            </div> */}

            {groupedLessons.schedule.length > 0 ? (
              <>
                {upcomingLessons.length > 0 ? (
                  renderLessons(upcomingLessons, 'Upcoming Lessons')
                ) : (
                  <div className="self-start flex flex-col w-full md:w-1/2 mt-4">
                    <h2 className="font-medium text-lg lg:text-xl px-6">
                      Upcoming Lessons
                    </h2>
                    <p className="ml-6 mt-2 underline">No upcoming lessons</p>
                  </div>
                )}

                {previousLessons.length > 0 ? (
                  renderLessons(previousLessons, 'Previous lessons')
                ) : (
                  <div className="self-start flex flex-col w-full md:w-1/2 mt-4">
                    <h2 className="font-medium text-lg lg:text-xl px-6">
                      Previous lessons
                    </h2>
                    <p className="ml-6 mt-2">No previous lessons.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="self-start flex flex-col w-full md:w-1/2 mt-4">
                <p className="ml-6 mt-2 underline">
                  No available time for this lesson
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-10/12 sm:w-3/5 flex gap-4 p-6 justify-center items-center rounded">
            <p className="text-red text-xl font-bold">
              {lessonsError.teacherDataError || lessonsError.noLessons}
            </p>
          </div>
        )}
      </div>
      <ScrollToTop/>
    </>
  );
};

export default Lessons;