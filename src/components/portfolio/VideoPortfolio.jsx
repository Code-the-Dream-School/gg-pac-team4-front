import DeleteIcon from '../../assets/icons/delete.png';
import FormUploadPortfolio from './FormUploadPortfolio';
import Loader from '../common/Loader';
import useMediaUploader from '../../util/PortfolioUploadMediaService';

const VideoPortfolio = ({ profilePortfolioVideos }) => {
  const {
    showFileInput,
    handleButtonClick,
    handleFileChange,
    handleMediaSubmit,
    handleDeleteMedia,
    error,
    isLoading,
  } = useMediaUploader('Videos');

  if (isLoading) return <Loader />;

  return (
    <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4 p-4">
      <h2 className="font-spartan font-semibold text-2xl py-2">
        Video Portfolio
      </h2>
      {profilePortfolioVideos.length > 0 ? (
        <div className="flex flex-wrap gap-6 w-full justify-evenly">
          {profilePortfolioVideos.map((video) => (
            <div key={video.publicId} className="relative lg:w-2/5">
              <video aria-label="portfolio video" controls>
                <source src={video.url} type="video/mp4" />
                <source src={video.url} type="video/mpeg" />
                <source src={video.url} type="video/quicktime" />
                <source src={video.url} type="video/x-msvideo" />
                Your browser does not support the video tag.
              </video>
              <button
                aria-label="delete video"
                onClick={() => handleDeleteMedia(video.publicId)}
                className="absolute top-[-0.5rem] right-[-0.5rem] p-1 hover:border-2 hover:border-red hover:rounded-full"
              >
                <img src={DeleteIcon} alt="delete icon" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Here you can add some video</p>
      )}
      {showFileInput && (
        <>
          <FormUploadPortfolio
            onSubmit={handleMediaSubmit}
            onChange={handleFileChange}
            multiple={true}
          />
          <p className="text-sm text-grey" aria-label="file input help">
            MP4, MPEG, QUICKTIME, MOV or X-MSVIDEO (MAX. 10MB).
          </p>
        </>
      )}
      <button
        className="bg-pureWhite py-1 w-2/5 lg:w-1/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red my-4"
        onClick={handleButtonClick}
      >
        {showFileInput ? 'Cancel' : 'Add More'}
      </button>
      {error.message && <p className='text-red font-bold'>{error.message}</p>}
    </div>
  );
};

export default VideoPortfolio;