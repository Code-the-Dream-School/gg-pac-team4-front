import EditProfileForm from './EditProfileForm';
import Loader from '../../common/Loader';
import subjectOptions from '../../../data/subjects';
import { useAuth } from '../../../AuthProvider';
import useEditProfile from '../../../util/EditProfileFormService';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { userData } = useAuth();
  const {
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
  } = useEditProfile();

  const navigate = useNavigate();

  const options = subjectOptions;

  const cancelEditing = () => navigate('/dashboard');

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <EditProfileForm
          onSubmit={handleSubmit}
          onPhotoSubmit={handlePhotoSubmit}
          options={options}
          role={userData.role}
          cancel={cancelEditing}
          formData={formData}
          onChange={handleChange}
          onHandleSubjects={handleSubjects}
          category={category}
          formErrors={formErrors}
          userPhotoSrc={userData.profileImageUrl}
          onPhotoChange={handlePhotoChange}
          isUpload={isUpload}
          setIsUpload={setIsUpload}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default EditProfile;
