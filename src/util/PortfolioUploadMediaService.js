import {
  deletePortfolioMedia,
  getUserData,
  uploadPortfolioMedia,
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
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
    console.log('Selected files:', files);
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
      ); console.log(result)
      if (result.status === 200) {
        const uploadedFileURL = await getUserData(userData._id, userData.token);
        console.log('up', uploadedFileURL);
        setUserData((userData) => ({
          ...userData,
          [`profilePortfolio${mediaType}`]: uploadedFileURL.data[`profilePortfolio${mediaType}`],
        }));
      }
      setIsLoading(false);
      setError({});
      setShowFileInput(!showFileInput);
    } catch (error) {
      setIsLoading(false);
      setError({ message: error });
      console.log(error);
      setShowFileInput(!showFileInput);
    }
  };

  const handleDeleteMedia = async (fileId) => {
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
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError({ message: error });
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
  };
};

export default useMediaUploader;