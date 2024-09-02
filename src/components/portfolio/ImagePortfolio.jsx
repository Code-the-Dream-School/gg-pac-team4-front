import DeleteIcon from '../../assets/icons/delete.png';
import FormUploadPortfolio from './FormUploadPortfolio';
import Loader from '../common/Loader';
import useMediaUploader from '../../util/PortfolioUploadMediaService';

const ImagePortfolio = ({ profilePortfolioImages }) => {
  const {
    showFileInput,
    handleButtonClick,
    handleFileChange,
    handleMediaSubmit,
    handleDeleteMedia,
    error,
    isLoading,
  } = useMediaUploader('Images');
  
  if (isLoading) return <Loader />;

  return (
    <div className="h-3/5 flex flex-col items-center bg-pureWhite mb-4 p-4">
      <h2 className="font-spartan font-semibold text-2xl py-2">Portfolio</h2>
      {profilePortfolioImages.length > 0 ? (
        <div className="flex flex-wrap gap-6 w-full">
          {profilePortfolioImages.map((image) => (
            <div key={image.publicId} className="relative w-28">
              <img
                src={image.url}
                alt="portfolio image"
                className="w-full h-full object-cover"
              />
              <button
                aria-label="delete image"
                onClick={() => handleDeleteMedia(image.publicId)}
                className="absolute top-[-0.5rem] right-[-0.5rem] p-1 hover:border-2 hover:border-red hover:rounded-full"
              >
                <img src={DeleteIcon} alt="" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Here you can add some images or drawings</p>
      )}
      {showFileInput && (
        <FormUploadPortfolio
          onSubmit={handleMediaSubmit}
          onChange={handleFileChange}
          multiple={true}
        />
      )}
      <button
        className="bg-pureWhite py-1 w-2/5 lg:w-1/5 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red my-4"
        onClick={handleButtonClick}
      >
        {showFileInput ? 'Cancel' : 'Add More'}
      </button>
      {error.message && <p>{error.message}</p>}
    </div>
  );
};

export default ImagePortfolio;