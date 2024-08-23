import { getClass, getClassesData } from '../../../util/DataBaseRequests';
import { useEffect, useState } from 'react';

import ClassImg from '../../../assets/ClassImg.jpg';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const navigate = useNavigate();
  const addClass = () => navigate('/dashboard/add-class');
  const { userData } = useAuth();
  const [classes, setClasses] = useState();
  const [selectedId, setSelectedId] = useState(userData.myClasses[0]);
  const [selectedClass, setSelectedClass] = useState();
  
  console.log(selectedClass)
  // console.log(userData.myClasses)

  useEffect(() => {
    const getTeacherClasses = async () => {
      try {
          const response = await getClassesData();
          const allClasses = response.classes;
          const myClassIds = userData.myClasses.map(id => id);
          const filteredClasses = allClasses.filter(classes => myClassIds.includes((classes._id)));
          setClasses(filteredClasses);
          let classItem = filteredClasses[0];
          setSelectedClass(classItem);
      } catch (error) {
        console.error("Error fetching classes data:", error);
        //setProfileError({ message: "Failed to fetch classes. Please try again later." });
      }
    };
  
    getTeacherClasses();
  }, [userData]);

  useEffect(()=> {
    const getSelectedClass = async () => {
      try {
        const response = await getClass(selectedId, userData.token);
        console.log(response)
      } catch (error) {
        console.error("Error fetching classes data:", error);
        setProfileError({ message: "Failed to fetch classes. Please try again later." });
      }
    }

    getSelectedClass()
  },[selectedId])


  return (
    <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
      <div className="bg-pureWhite w-full sm:w-1/4 flex flex-col items-center">
        <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
          My Classes
        </h1>
        {classes ? (
          <> 
            {classes.map(({_id, classImageUrl, classTitle}) => {
              return (
                <div key={_id} onClick={() => setSelectedId(_id)} className="flex flex-wrap w-full justify-center gap-4 items-center p-2 hover:bg-lightGreen transition duration-300 easy-in">
                  <img
                    src={classImageUrl}
                    className="w-24"
                    alt="class image small"
                  />
                  <p className="font-spartan font-semibold sm:text-lg text-center">
                    {classTitle}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p>You have not added classes yet</p>
        )}
        <button
          onClick={addClass}
          aria-label="Add a new class"
          className="text-lg sm:text-3xl text-red border-2 border-red rounded w-1/5 my-2 hover:bg-red hover:text-white transition duration-300 easy-in"
        >
          +
        </button>
      </div>
      <div className="bg-pureWhite sm:w-3/5 flex flex-col gap-4 pb-6">
        <div className="flex flex-wrap justify-around gap-1 mt-10">
          <img src={ClassImg} alt="Class image full" className="w-44 sm:w-72" />
          <div className="mr-12">
            <p className=" text-2xl sm:text-3xl font-bold"></p>
            <p className="text-sm sm:text-base">per session</p>
            <p className="text-sm sm:text-base py-2">Ages: </p>
            <p className="text-sm sm:text-base py-2">Online or offline</p>
            <p className="text-sm sm:text-base py-2">Weekly</p>
          </div>
        </div>
        <div>
          <h2 className="font-medium text-lg text-center">
            
          </h2>
          <p className="p-5">
            This small, private class focuses on technique building and
            exploration of watercolor as a creative arts medium.
          </p>
          <p className="p-5">Other information about the class.</p>
        </div>
        <div className="flex gap-8 justify-center">
          <button
            type="submit"
            className="bg-yellow w-1/3 hover:bg-pureWhite hover:text-yellow hover:border-2 hover:border-yellow text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in"
          >
            Edit
          </button>
          <button className="w-1/3 bg-pureWhite text-red hover:bg-red hover:text-pureWhite border-2 border-red font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 easy-in">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classes;