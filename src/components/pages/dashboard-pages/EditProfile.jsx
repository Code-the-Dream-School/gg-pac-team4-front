import { useEffect, useState } from "react";

import EditProfileForm from './EditProfileForm';
import subjectOptions from '../../../data/subjects';
import { updateProfile } from "../../../util/DataBaseRequests";
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { userData } = useAuth();
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
  const [formErrors, setFormErrors] = useState({}); 
  const navigate = useNavigate();
  const options = subjectOptions;

  console.log(formData)
  // console.log(formData.subjectArea);
  // console.log(typeof(formData.subjectArea));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' })
  }
  
  const setSubjects = (value) => {
    let result;
    if(value !== null) {
      result = value.map((item) => item.value);
    }
    setCategory(value);
    setFormData({ ...formData, subjectArea: result });
  }

  const cancelEditing = () => navigate('/dashboard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormErrors({
        ...formErrors,
        email: !formData.email ? "Email is required" : null,
        firstName: !formData.firstName ? "First name is required" : null,
        lastName: !formData.lastName ? "Last name is required" : null,
      });
      return;
    }
    
    try {
      const result = await updateProfile(userData._id, userData.token, formData);
      if(result.status === 200) {
        console.log(result)
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        form: "Cannot update profile",
      });
    }
  }

  return (
    <EditProfileForm
      onSubmit={handleSubmit}
      options={options}
      role={userData.role}
      cancel={cancelEditing}
      formData={formData}
      onChange={handleChange}
      onSetSubjects={setSubjects}
      selectValue={category}
      formErrors={formErrors}
    />
  );
};

export default EditProfile;