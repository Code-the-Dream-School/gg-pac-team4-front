import { Link } from 'react-router-dom';

const HomeStudent = ({ profile, onNavigate, error }) => {
  const { firstName, lastName, dateOfBirth, adultName } = profile;
  let studentAge = (new Date().getTime() - new Date(dateOfBirth)) / (24 * 3600 * 365.25 * 1000);
  return (
    <div className="flex flex-col sm:flex-row w-full flex-grow sm:justify-around">
      <div className="flex flex-col sm:w-4/12 items-center gap-4 mt-4">
        <div className="flex flex-wrap p-2 items-center justify-center gap-4">
          <div className="w-20 h-20 bg-grey rounded-full"></div>
          <div className="font-spartan font-semibold text-2xl text-center xl:text-left">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-center">
          <button onClick={onNavigate} className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/2 md:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-xl rounded-lg transition duration-300 easy-in">
            Edit Profile
          </button>
        </div>
        {error.message && <p>{error.message}</p>}
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite ">
          <h3 className="font-spartan font-bold text-xl">Date Of Birth</h3>
          <p>{dateOfBirth}</p>
          <h3 className="font-spartan font-bold text-xl text-center">
            Interests
          </h3>
          <p></p>
          <h3 className="font-spartan font-bold text-xl">About</h3>
          <p></p>
        </div>
        {studentAge < 16 
            ? 
              <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite">
                <h3 className="font-spartan font-bold text-xl">
                  Parents information
                </h3>
                <p>{adultName}</p>
              </div>
            : null
        }
      </div>
      <div className="flex flex-col w-9/12 sm:w-7/12 gap-8 mt-4 self-center sm:self-start">
        <div className="sm:h-2/5 flex flex-col bg-pureWhite">
          <h2 className="font-spartan font-semibold text-2xl p-4">
            Your upcoming lessons
          </h2>
          <Link className="p-4 underline mt-auto" to="/dashboard/lessons">
            See more lessons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeStudent;