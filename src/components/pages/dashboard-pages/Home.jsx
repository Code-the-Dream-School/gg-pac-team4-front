import HomeStudent from './HomeStudent';
import HomeTeacher from './HomeTeacher';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = ({ profile, error }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const editProfile = () => navigate('/dashboard/edit-profile');
  return (
    <>
      {userData.role === 'teacher' ? (
        <HomeTeacher profile={profile} onNavigate={editProfile} error={error} />
      ) : (
        <HomeStudent profile={profile} onNavigate={editProfile} error={error} />
      )}
    </>
  );
};

export default Home;
