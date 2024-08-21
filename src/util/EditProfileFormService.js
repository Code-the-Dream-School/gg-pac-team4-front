import {
  getUserData,
  updateUser,
  updateUserPhoto,
} from '../util/DataBaseRequests';

import handleError from '../util/errorMessages';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useEditProfile = () => {
  const { userData, setUserData } = useAuth();

  const [category, setCategory] = useState(null); //state for select
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    education: userData.education,
    experience: userData.experience,
    subjectArea: userData.subjectArea || category,
    aboutMe: userData.aboutMe,
  });
  const [file, setFile] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //handle the text and select fields of the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  };

  const handleSubjects = (value) => {
    let result;
    if (value !== null) {
      result = value.map((item) => item.value);
    }
    setCategory(value);
    setFormData({ ...formData, subjectArea: result });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormErrors({
        ...formErrors,
        email: !formData.email ? 'Email is required' : '',
        firstName: !formData.firstName ? 'First name is required' : '',
        lastName: !formData.lastName ? 'Last name is required' : '',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUser(userData._id, userData.token, formData);
      let newData = JSON.parse(result);
      setFormData(newData);
      setUserData((userData) => ({
        ...userData,
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
        education: newData.education,
        experience: newData.experience,
        subjectArea: newData.subjectArea,
        aboutMe: newData.aboutMe,
      }));
      navigate('/dashboard');
    } catch (error) {
      handleError(error, setFormErrors);
    } finally {
      setIsLoading(false);
    }
  };

  //handle the uploading of the profile image
  const handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formPhotoData = new FormData();
    formPhotoData.append('profileImage', file);
    try {
      const result = await updateUserPhoto(
        userData._id,
        userData.token,
        formPhotoData
      );
      if (result.status === 200) {
        const uploadedFileURL = await getUserData(userData._id, userData.token);
        setUserData((userData) => ({
          ...userData,
          profileImageUrl: uploadedFileURL.data.profileImageUrl,
        }));
      }
      setIsUpload(false);
    } catch (error) {
      handleError(error, setFormErrors);
    } finally {
      setIsLoading(false);
      setFormErrors({});
    }
  };

  return {
    handleSubmit,
    handlePhotoSubmit,
    formData,
    handleChange,
    handleSubjects,
    category,
    formErrors,
    handlePhotoChange,
    isUpload,
    setIsUpload,
    isLoading,
  };
};

export default useEditProfile;