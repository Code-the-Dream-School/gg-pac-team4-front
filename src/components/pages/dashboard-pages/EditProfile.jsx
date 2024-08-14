import EditProfileForm from './EditProfileForm';
import subjectOptions from '../../../data/subjects';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const options = subjectOptions;

  const cancelEditing = () => navigate('/dashboard');

  return (
    <EditProfileForm
      options={options}
      role={userData.role}
      cancel={cancelEditing}
    />
  );
};

export default EditProfile;