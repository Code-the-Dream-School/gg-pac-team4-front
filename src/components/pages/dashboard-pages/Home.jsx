import HomeStudent from './HomeStudent';
import HomeTeacher from './HomeTeacher';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = ({ profile, profileError}) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const editProfile = () => navigate('/dashboard/edit-profile');
  return (
    <>
<<<<<<< HEAD
      {userData.role === 'teacher' 
        ? <HomeTeacher profile={profile} onNavigate={editProfile} profileError={profileError}/>
        : <HomeStudent profile={profile} onNavigate={editProfile} profileError={profileError}/>
      }
=======
      {userData.role === 'teacher' ? (
        <HomeTeacher profile={profile} onNavigate={editProfile} error={error} />
      ) : (
        <HomeStudent profile={profile} onNavigate={editProfile} error={error} />
      )}
>>>>>>> 260b01e2b168d8a388bfaa52deb2d1b96043c834
    </>
  );
};

export default Home;
