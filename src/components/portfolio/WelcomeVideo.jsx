import DeleteIcon from '../../assets/icons/delete.png';
import FormUploadPortfolio from './FormUploadPortfolio';
import Loader from '../common/Loader';
import useMediaUploader from '../../util/PortfolioUploadMediaService';

const WelcomeVideo = ({ profileVideoUrl }) => {
  const {
    showFileInput,
    handleButtonClick,
    error,
    isLoading,
    handleWelcomeVideoChange,
    handleWelcomeVideoSubmit,
    handleWelcomeVideoDelete,
  } = useMediaUploader();

  if (isLoading) return <Loader />;

  return (
    <div className="h-2/5 flex flex-col items-center justify-center bg-pureWhite p-4">
      {profileVideoUrl ? (
        <>
          <h3 className="mb-4 font-spartan font-semibold text-2xl">
            Your welcome video
          </h3>
          <div className="relative lg:w-2/5">
            <video aria-label="portfolio video" controls>
              <source src={profileVideoUrl} type="video/mp4" />
              <source src={profileVideoUrl} type="video/mpeg" />
              <source src={profileVideoUrl} type="video/quicktime" />
              <source src={profileVideoUrl} type="video/x-msvideo" />
              Your browser does not support the video tag.
            </video>
            <button
              aria-label="delete image"
              onClick={handleWelcomeVideoDelete}
              className="absolute top-[-0.5rem] right-[-0.5rem] p-1 hover:border-2 hover:border-red hover:rounded-full"
            >
              <img src={DeleteIcon} alt="delete icon" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            {showFileInput && (
              <FormUploadPortfolio
                onSubmit={handleWelcomeVideoSubmit}
                onChange={handleWelcomeVideoChange}
                multiple={false}
              />
            )}

            <button
              className="border-2 border-red font-spartan text-red text-lg font-semibold rounded-lg px-7 h-10 hover:text-white hover:bg-red hover:border-0 transition duration-300 easy-in"
              onClick={handleButtonClick}
            >
              {showFileInput ? ' Cancel' : 'Add Welcome Video'}
            </button>
          </div>
          {showFileInput && <p className="text-sm text-grey" aria-label="file input help">
            MP4, MPEG, QUICKTIME, MOV or X-MSVIDEO (MAX. 10MB).
          </p>}
        </div>
      )}
      {error.message && <p className="text-red font-bold mt-2">{error.message}</p>}
    </div>
  );
};

export default WelcomeVideo;