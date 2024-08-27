import HomeStudent from './HomeStudent';
import HomeTeacher from './HomeTeacher';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = ({ profile, profileError }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const editProfile = () => navigate('/dashboard/edit-profile');
  return (
    <>
      {userData.role === 'teacher' ? (
        <HomeTeacher
          profile={profile}
          onNavigate={editProfile}
          profileError={profileError}
        />
      ) : (
        <HomeStudent
          profile={profile}
          onNavigate={editProfile}
          profileError={profileError}
        />
      )}
    </>
  );
};

export default Home;
