import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../../../AuthProvider";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const {userData} = useAuth();
  const navigate = useNavigate();
  const options = [
    { value: 'Music', label: 'Music' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Dance', label: 'Dance' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Film Production', label: 'Film Production' },
    { value: 'Design', label: 'Design' },
    { value: 'Acting Skills', label: 'Acting Skills' },
    { value: 'Storytelling', label: 'Storytelling'},
    { value: 'Ceramics & Sculpture', label: 'Ceramics & Sculpture' },
    { value: 'Handicrafts', label: 'Handicrafts' },
    { value: '3D & Animation', label: '3D & Animation'},
    { value: 'Games & Hobbies', label: 'Games & Hobbies'},
  ];
  
  const cancelEditing = () => navigate("/dashboard");
    
    return (
      <>
        <EditProfileForm options={options} role={userData.role} cancel={cancelEditing}/>
      </>
    );
  };
  
  export default EditProfile;