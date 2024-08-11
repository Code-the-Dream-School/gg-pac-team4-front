const HomeTeacher = ({ profile, onNavigate, error }) => {
  const { firstName, lastName } = profile;
  //console.log(profile)
  return (
    <div className="flex flex-wrap w-full flex-grow justify-around">
      <div className="flex flex-col w-4/12 items-center gap-4 mt-4">
        <div className="flex flex-wrap p-2 items-center justify-center gap-4">
          <div className="w-20 h-20 bg-grey rounded-full"></div>
          <div className="font-spartan font-semibold text-2xl text-center xl:text-left">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-center">
          <button
            className="bg-red hover:bg-pureWhite hover:text-red h-8 w-full md:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-base sm:text-xl rounded-lg transition duration-300 easy-in"
            onClick={onNavigate}
          >
            Edit Profile
          </button>
        </div>
        {error.message && <p>{error.message}</p>}
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite ">
          <h3 className="font-spartan font-bold text-xl">Speacialty</h3>
          <p></p>
          <h3 className="font-spartan font-bold text-xl text-center">
            Education & Experience
          </h3>
          <p></p>
        </div>
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite">
          <h3 className="font-spartan font-bold text-xl">About</h3>
          <p></p>
        </div>
      </div>
      <div className="flex flex-col w-7/12 gap-8 mt-4">
        <div className="h-2/5 flex items-center justify-center bg-pureWhite">
          <button className="bg-pureWhite w-9/12 md:w-4/12 py-1 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
            Add Welcome Video
          </button>
        </div>
        <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4">
          <h2 className="font-spartan font-semibold text-2xl py-2">
            Portfolio
          </h2>
          <p>Here will be some pictures</p>
          <button className="mt-auto bg-pureWhite py-1 w-1/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red mb-4">
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTeacher;
