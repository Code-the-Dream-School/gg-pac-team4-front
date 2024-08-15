import ClassImg from '../../../assets/ClassImg.jpg';
import { useNavigate } from 'react-router-dom';
const Classes = () => {
  const navigate = useNavigate();
  const addClass = () => navigate('/dashboard/add-class');
  return (
    <div className="flex sm:flex-row flex-col gap-4 sm:gap-1 w-full justify-evenly p-4 items-start mb-10">
      <div className="bg-pureWhite w-full sm:w-1/4 flex flex-col items-center">
        <h1 className="text-black font-semibold text-xl font-spartan text-center py-4">
          My Classes
        </h1>
        <div className="flex flex-wrap w-full justify-center gap-4 items-center p-2 hover:bg-lightGreen transition duration-300 easy-in">
          <img src={ClassImg} className="w-24" alt="class image small" />
          <p className="font-spartan font-semibold sm:text-lg text-center">
            1-1 Watercolor class
          </p>
        </div>
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
            <p className=" text-2xl sm:text-3xl font-bold">$35</p>
            <p className='text-sm sm:text-base'>per session</p>
            <p className="text-sm sm:text-base py-2">Age</p>
            <p className="text-sm sm:text-base py-2">Online or offline</p>
            <p className="text-sm sm:text-base py-2">Weekly</p>
          </div>
        </div>
        <div>
          <h2 className='font-medium text-lg text-center'>1:1 Personalize Watercolor Drawing Lesson - Art for Beginners</h2>
          <p className='p-5'>This small, private class focuses on technique building and exploration of watercolor as a creative arts medium.</p>
          <p className='p-5'>Other information about the class.</p>
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