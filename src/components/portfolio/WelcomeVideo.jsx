import {
  addUpdateWelcomeVideo,
  deleteWelcomeVideo,
  getUserData,
} from '../../util/DataBaseRequests';

import DeleteIcon from '../../assets/icons/delete.png';
import FormUploadPortfolio from './FormUploadPortfolio';
import { useAuth } from '../../AuthProvider';
import { useState } from 'react';

const WelcomeVideo = () => {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useAuth();
  const [error, setError] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  
  const handleVideoChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('profileVideo', file);
    try {
      const result = await addUpdateWelcomeVideo(
        userData._id,
        userData.token,
        formData
      );
      console.log('res', result);
      if (result.status === 200) {
        const uploadedFileURL = await getUserData(userData._id, userData.token);
        console.log('up', uploadedFileURL.data.profileVideoUrl);
        setUserData((userData) => ({
          ...userData,
          profileVideoUrl: uploadedFileURL.data.profileVideoUrl,
        }));
      }
      setIsLoading(false);
      setError({});
    } catch (error) {
      setIsLoading(false);
      setError({ message: error });
      console.log('error', error);
    }
  };

  const handleVideoDelete = async () => {
    setIsLoading(true); 
    try {
      const result = await deleteWelcomeVideo(userData._id, userData.token);
      console.log('Delete result:', result);

      if (result.status === 200) {
        const response = await getUserData(userData._id, userData.token);
        console.log('User data after delete:', response.data);
        console,log(updatedUrl);

        setUserData((userData) => ({
          ...userData,
          profileVideoUrl: '',
        }));

        console.log('Updated userData:', userData);
      } else {
        setError({ message: 'Failed to delete the video.' });
      }
    } catch (error) {
      console.log('Error deleting video:', error);
      setError({ message: 'An error occurred while deleting the video.' });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="h-2/5 flex flex-col items-center justify-center bg-pureWhite p-4">
      {error.message && <p className="text-red font-bold">{error.message}</p>}
      {userData.profileVideoUrl ? (
        <div className="relative lg:w-2/5">
          <video aria-label="portfolio video" controls>
            <source src={userData.profileVideoUrl} type="video/mp4" />
            <source src={userData.profileVideoUrl} type="video/mpeg" />
            <source src={userData.profileVideoUrl} type="video/quicktime" />
            <source src={userData.profileVideoUrl} type="video/x-msvideo" />
            Your browser does not support the video tag.
          </video>
          <button
            aria-label="delete image"
            onClick={handleVideoDelete}
            className="absolute top-[-0.5rem] right-[-0.5rem] p-1 hover:border-2 hover:border-red hover:rounded-full"
          >
            <img src={DeleteIcon} alt="delete icon" />
          </button>
        </div>
      ) : (
        <button className="bg-pureWhite w-9/12 md:w-4/12 py-1 hover:bg-red hover:text-pureWhite hover:border-2 hover:border-red text-red font-spartan font-semibold text-lg rounded-md border-2 border-red"
        onClick={() => setIsUploading(!isUploading)}
        >
          Add Welcome Video
        </button>
      )}
      {
        isUploading && <FormUploadPortfolio
        onSubmit={handleVideoSubmit}
        onChange={handleVideoChange}
        multiple={false}
      />
      }
      
    </div>
  );
};

export default WelcomeVideo;