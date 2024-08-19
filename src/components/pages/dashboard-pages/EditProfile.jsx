import {
  getUserData,
  updateUser,
  updateUserPhoto,
} from '../../../util/DataBaseRequests';

import EditProfileForm from './EditProfileForm';
import subjectOptions from '../../../data/subjects';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditProfile = () => {
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
  const navigate = useNavigate();
  const options = subjectOptions;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  };
  console.log(formData);
  const setSubjects = (value) => {
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
        email: !formData.email ? 'Email is required' : null,
        firstName: !formData.firstName ? 'First name is required' : null,
        lastName: !formData.lastName ? 'Last name is required' : null,
      });
      return;
    }

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
      setFormErrors({
        ...formErrors,
        form: 'Cannot update profile',
      });
    }
  };

  const handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/dashboard');
      setIsUpload(false);
    } catch (error) {
      setFormErrors({
        ...formErrors,
        image: 'Cannot update image',
      });
    }
  };

  const cancelEditing = () => navigate('/dashboard');

  return (
    <EditProfileForm
      onSubmit={handleSubmit}
      onPhotoSubmit={handlePhotoSubmit}
      options={options}
      role={userData.role}
      cancel={cancelEditing}
      formData={formData}
      onChange={handleChange}
      onSetSubjects={setSubjects}
      selectValue={category}
      formErrors={formErrors}
      userPhotoSrc={userData.profileImageUrl}
      onPhotoChange={handlePhotoChange}
      isUpload={isUpload}
      setIsUpload={setIsUpload}
    />
  );
};

export default EditProfile;
