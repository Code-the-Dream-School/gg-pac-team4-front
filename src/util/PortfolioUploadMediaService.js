import {
  deletePortfolioMedia,
  deleteWelcomeVideo,
  getUserData,
  uploadPortfolioMedia,
  uploadWelcomeVideo
} from './DataBaseRequests';

import { useAuth } from '../AuthProvider';
import { useState } from 'react';

const useMediaUploader = (mediaType) => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useAuth();

  const handleButtonClick = () => {
    setShowFileInput(!showFileInput);
    setError({});
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handleMediaSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postedForm = new FormData();
    uploadedFiles.forEach((file) => {
      postedForm.append(`profilePortfolio${mediaType}`, file);
    });

    try {
      const result = await uploadPortfolioMedia(
        userData._id,
        userData.token,
        postedForm,
        mediaType
      );
      if (result.status === 200) {
        const uploadedFileURL = await getUserData(userData._id, userData.token);
        setUserData((userData) => ({
          ...userData,
          [`profilePortfolio${mediaType}`]: uploadedFileURL.data[`profilePortfolio${mediaType}`],
        }));
      }
      setIsLoading(false);
      setError({});
      setShowFileInput(!showFileInput);
      setUploadedFiles([]);
    } catch (error) {
      setIsLoading(false);
      setError({ message: error.data.error || error.data.message });
      console.log(error);
      setShowFileInput(!showFileInput);
      setUploadedFiles([]);
    }
  };

  const handleDeleteMedia = async (fileId) => {
    setIsLoading(true); 
    try {
      const result = await deletePortfolioMedia(
        userData._id,
        userData.token,
        fileId,
        mediaType
      );
      if (result.status === 200) {
        const updatedPortfolio = await getUserData(userData._id, userData.token);
        setUserData((userData) => ({
          ...userData,
          [`profilePortfolio${mediaType}`]: updatedPortfolio.data[`profilePortfolio${mediaType}`],
        }));
        setIsLoading(false);
        setError({});
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError({ message: error });
    }
  };

  //for uploading welcome video
  const handleWelcomeVideoChange = (e) => {
    setUploadedFiles(e.target.files[0]);
  };

  const handleWelcomeVideoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('profileVideo', uploadedFiles);
    try {
      const result = await uploadWelcomeVideo(
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
      setUploadedFiles([]);
    } catch (error) {
      setIsLoading(false);
      setError({ message: error.data.error || error.data.message });
      setShowFileInput(!showFileInput);
      setUploadedFiles([]);
      console.log('error', error.data);
    }
  };

  const handleWelcomeVideoDelete = async () => {
    setIsLoading(true); 
    try {
      const result = await deleteWelcomeVideo(userData._id, userData.token);
      if (result.status === 200) {
        setUserData((userData) => ({
          ...userData,
          profileVideoUrl: '',
        }));
        setIsLoading(false);
        setError({});
        setShowFileInput(false);
      } else {
        setError({ message: 'Failed to delete the video.' });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error deleting video:', error);
      setIsLoading(false);
      setError({ message: 'An error occurred while deleting the video.' });
    } 
  };


  return {
    showFileInput,
    handleButtonClick,
    setShowFileInput,
    handleFileChange,
    uploadedFiles,
    error,
    isLoading,
    handleMediaSubmit,
    handleDeleteMedia,
    handleWelcomeVideoChange,
    handleWelcomeVideoSubmit,
    handleWelcomeVideoDelete
  };
};

export default useMediaUploader;