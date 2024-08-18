const HomeTeacher = ({ profile, onNavigate, profileError }) => {
  const { 
    firstName, 
    lastName, 
    aboutMe, 
    education, 
    experience, 
    subjectArea, 
    profileImageUrl, 
    profilePortfolioImages, 
    profilePortfolioVideos } = profile;
  
  return (
    <div className="flex flex-col sm:flex-row w-full flex-grow sm:justify-around">
      <div className="flex flex-col sm:w-4/12 items-center gap-4 mt-4">
        <div className="flex flex-wrap p-2 items-center justify-center gap-4">
          <img className="w-20 h-20 rounded-full" src={profileImageUrl} alt="user photo"/>
          <div className="font-spartan font-semibold text-2xl text-center xl:text-left">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-center">
          <button
            className="bg-red hover:bg-pureWhite hover:text-red h-8 w-1/2 md:w-2/4 hover:border-2 hover:border-red text-white font-spartan font-semibold text-sm sm:text-lg rounded-lg transition duration-300 easy-in"
            onClick={onNavigate}
          >
            Edit Profile
          </button>
        </div>
        {profileError.message && <p>{profileError.message}</p>}
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite ">
          <h3 className="font-spartan font-bold text-xl">Speacialty</h3>
          <p>{subjectArea.length > 0 ? <>{subjectArea.join(' | ')}</> : 'Please edit your profile'}</p>
          <h3 className="font-spartan font-bold text-xl text-center">
            Education & Experience
          </h3>
          <p className='px-2'>{education ? education : 'Please edit your profile'}</p>
          <p className='px-2'>{experience}</p>
        </div>
        <div className="flex flex-col w-3/4 p-2 items-center justify-center gap-4 bg-pureWhite">
          <h3 className="font-spartan font-bold text-xl">About</h3>
          <p>{aboutMe ? aboutMe : 'Please edit your profile'}</p>
        </div>
      </div>
      <div className="flex flex-col w-9/12 sm:w-7/12 gap-8 self-center mt-2">
        <div className="h-2/5 flex items-center justify-center bg-pureWhite p-4">
          <button className="bg-pureWhite w-9/12 md:w-4/12 py-1 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red">
            Add Welcome Video
          </button>
        </div>
        <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4 p-4">
          <h2 className="font-spartan font-semibold text-2xl py-2">
            Portfolio
          </h2>
          <p>{profilePortfolioImages.length > 0 ? profilePortfolioImages : "Here you can add some drawings"}</p>
          <button className="bg-pureWhite py-1 w-2/5 lg:w-1/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red my-4">
            Add More
          </button>
        </div>
        <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4">
          <h2 className="font-spartan font-semibold text-2xl py-2">
            Video Portfolio
          </h2>
          <p>{profilePortfolioVideos.length > 0 ? profilePortfolioVideos : "Here you can add some videos"}</p>
          <button className="bg-pureWhite py-1 w-2/5 lg:w-1/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red my-4">
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTeacher;
