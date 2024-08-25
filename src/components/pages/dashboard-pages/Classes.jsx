import { useEffect, useState } from 'react';

import IconAge from '../../../assets/icons/icon-age.svg';
import IconClock from '../../../assets/icons/icon-clock.svg';
import IconLesson from '../../../assets/icons/icon-lesson.svg';
import IconType from '../../../assets/icons/icon-type.png';
import Loader from '../../common/Loader';
import { getClassesData } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const navigate = useNavigate();
  const addClass = () => navigate('/dashboard/add-class');
  const { userData } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classesError, setClassesError] = useState({});

  useEffect(() => {
    const getTeacherClasses = async () => {
      try {
        const response = await getClassesData();
        const allClasses = response.classes;
        const myClassIds = userData.myClasses.map((id) => id);
        const filteredClasses = allClasses.filter((classes) =>
          myClassIds.includes(classes._id)
        );
        setClasses(filteredClasses);
        setSelectedId(filteredClasses[0]._id);
        setClassesError({ message: '' });
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
    if (selectedId) {
      const initialClass = classes.filter((classes) =>
        selectedId.includes(classes._id)
      );
      setSelectedClass(initialClass);
    }
  }, [selectedId]);

  const classesList = classes.map(({ _id, classImageUrl, classTitle }) => {
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
          className="w-32 md:w-24 rounded"
          alt="class image small"
        />
        <p className="font-spartan font-semibold sm:text-lg text-center w-full">
          {classTitle}
        </p>
      </div>
    );
  });

  return (
    <>
      {classesError && (
        <p className="text-red text-xl font-bold">{classesError.message}</p>
      )}
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
        <div className="bg-pureWhite w-10/12 sm:w-1/4 flex flex-col items-center self-center sm:self-start">
          <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
            My Classes
          </h1>
          {classes ? classesList : <p>You have not added classes yet</p>}
          <button
            onClick={addClass}
            aria-label="Add a new class"
            className="text-lg sm:text-3xl text-red border-2 border-red rounded w-1/5 my-2 hover:bg-red hover:text-white transition duration-300 easy-in"
          >
            +
          </button>
        </div>
        {selectedClass ? (
          <div className="bg-pureWhite w-10/12 sm:w-3/5 flex flex-col gap-4 pb-6 self-center sm:self-start items-center">
            <div className="flex flex-wrap justify-around gap-5 md:gap-1 mt-10 h-full">
              <img
                src={selectedClass[0].classImageUrl}
                alt="Class image full"
                className="w-44 sm:w-1/2 rounded object-contain"
              />
              <div className="mr-12 h-contain flex flex-col justify-between">
                <p className="text-2xl sm:text-3xl font-bold">
                  ${selectedClass[0].price}
                </p>
                <p className="text-sm sm:text-base">per session</p>
                <div className="flex gap-2 mt-1">
                  <img src={IconAge} alt="Icon age" className="w-6 h-6" />
                  <p className="text-sm sm:text-base py-1 ">
                    Ages: {selectedClass[0].ages.minAge} -{' '}
                    {selectedClass[0].ages.maxAge}
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <img
                    src={IconLesson}
                    alt="Icon lesson type"
                    className="w-6 h-6"
                  />
                  <p className="text-sm sm:text-base py-1">
                    {selectedClass[0].type}
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <img
                    src={IconType}
                    alt="Icon class type"
                    className="w-6 h-6"
                  />
                  <p className="text-sm sm:text-base py-1">
                    {selectedClass[0].lessonType}
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <img
                    src={IconClock}
                    alt="Icon lesson duration"
                    className="w-6 h-6"
                  />
                  <p className="text-sm sm:text-base py-1">
                    {selectedClass[0].duration} min
                  </p>
                </div>
              </div>
            </div>
            <div className="w-11/12 flex flex-col">
              <h2 className="font-medium text-xl text-center">
                {selectedClass[0].classTitle}
              </h2>
              <p className="p-5">{selectedClass[0].description}</p>
              <h3 className="font-medium text-lg text-center">
                Class experience
              </h3>
              <p className="p-5">{selectedClass[0].experience}</p>
              <h3 className="font-medium text-lg text-center">
                Learning goals
              </h3>
              <p className="p-5">{selectedClass[0].goal}</p>
              <h3 className="font-medium text-lg text-center">Other details</h3>
              <p className="p-5">{selectedClass[0].other}</p>
            </div>
            <div className="flex gap-8 justify-center w-full sm:2/5 ">
              {/* these buttons have no functionality yet */}
              <button className="bg-yellow w-1/3 hover:bg-pureWhite hover:text-yellow hover:border-2 hover:border-yellow text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">
                Edit
              </button>
              <button className="w-1/3 bg-pureWhite text-red hover:bg-red hover:text-pureWhite border-2 border-red font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Classes;