import { addClassForm, getUserData, updateClassForm } from './DataBaseRequests';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../AuthProvider';
import { useState } from 'react';

const useClasses = () => {
  const { classId } = useParams();
  const { userData, setUserData } = useAuth();
  const [category, setCategory] = useState(null); //state for select
  const [formData, setFormData] = useState({
    classTitle: '',
    category: category,
    description: '',
    classImage: {},
    price: '',
    duration: '',
    ages: { minAge: '', maxAge: '' },
    type: '',
    lessonType: '',
    goal: '',
    experience: '',
    other: '',
    availableTime: [{ date: '', startTime: '' }],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const returnToClasses = () => navigate('/dashboard/classes');

  const handleAddTime = () => {
    setFormData((formData) => ({
      ...formData,
      availableTime: [...formData.availableTime, { date: '', startTime: '' }],
    }));
  };

  const handleRemoveTime = (index) => {
    setFormData((formData) => ({
      ...formData,
      availableTime: formData.availableTime.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    if (name === 'classImage') {
      setFormData({ ...formData, classImage: files[0] });
    } else if (name === 'minAge' || name === 'maxAge') {
      setFormData({
        ...formData,
        ages: {
          ...formData.ages,
          [name]: value,
        },
      });
    } else if (name === 'date' || name === 'startTime') {
      const newAvailableTime = [...formData.availableTime];
      newAvailableTime[index][name] = value;
      setFormData({
        ...formData,
        availableTime: newAvailableTime,
      });

      let availableTimeError = false;
      newAvailableTime.forEach((time) => {
        if (!time.date || !time.startTime) {
          availableTimeError = true;
        }
      });

      setFormErrors((formErrors) => ({
        ...formErrors,
        availableTime: availableTimeError
          ? 'Please provide the date and start time for all available times'
          : '',
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setFormErrors((formErrors) => ({
      ...formErrors,
      [name]: '',
    }));
  };

  const handleSubjects = (value) => {
    setCategory(value);
    setFormData({ ...formData, category: value.value });
    setFormErrors((formErrors) => ({
      ...formErrors,
      category: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let availableTimeError = false;
    formData.availableTime.forEach((time) => {
      if (!time.date || !time.startTime) {
        availableTimeError = true;
      }
    });

    if (
      !formData.classTitle ||
      !formData.description ||
      !formData.price ||
      !formData.duration ||
      !formData.ages.minAge ||
      !formData.ages.maxAge ||
      !formData.type ||
      !formData.lessonType ||
      availableTimeError
    ) {
      setFormErrors({
        ...formErrors,
        classTitle: !formData.classTitle
          ? 'Please provide your class title'
          : '',
        category: !formData.category
          ? 'Please provide the category of the class'
          : '',
        description: !formData.description
          ? 'Please provide your class description'
          : '',
        price: !formData.price ? 'Please provide the class price' : '',
        duration: !formData.duration ? 'Please provide the duration' : '',
        minAge: !formData.ages.minAge ? 'Please provide the minimum age' : '',
        maxAge: !formData.ages.maxAge ? 'Please provide the maximum age' : '',
        lessonType: !formData.lessonType
          ? 'Please specify the lesson type'
          : '',
        type: !formData.type ? 'Please provide the type of class' : '',
        availableTime: availableTimeError
          ? 'Please provide the date and start time for all available times'
          : '',
      });
      return;
    }

    const postedForm = createMultipartForm(formData);

    try {
      let response;
      if (classId)
        response = await updateClassForm(classId, userData.token, postedForm);
      else response = await addClassForm(userData.token, postedForm);

      if (response.status === 201 || response.status === 200) {
        setIsLoading(true);
        const response = await getUserData(userData._id, userData.token);
        setUserData((userData) => ({
          ...userData,
          myClasses: response.data.myClasses,
        }));
        returnToClasses();
        setIsLoading(false);
        setFormErrors({});
      }
    } catch (error) {
      console.log('error', error.data.error);
      setFormErrors({ ...formErrors, form: error.data.error });
    }
  };

  const createMultipartForm = (data) => {

    const multipartForm = new FormData();

    for (let key in data) {
      if (key === 'ages') {
        multipartForm.append('ages[minAge]', data.ages.minAge);
        multipartForm.append('ages[maxAge]', data.ages.maxAge);
      } else if (key === 'availableTime') {
        data.availableTime.forEach((time, index) => {
          multipartForm.append(
            `availableTime[${index}][date]`,
            new Date(time.date)
          );
          multipartForm.append(
            `availableTime[${index}][startTime]`,
            time.startTime
          );
        });
      } else if (data[key] !== null && data[key] !== undefined) {
        multipartForm.append(key, data[key]);
      }
    }

    return multipartForm;
  };

  return {
    createMultipartForm,
    handleSubmit,
    handleSubjects,
    handleChange,
    handleAddTime,
    handleRemoveTime,
    returnToClasses,
    formErrors,
    formData,
    isLoading,
    category,
    setFormData,
    setIsLoading,
    setCategory,
    setFormErrors,
  };
};

export default useClasses;
