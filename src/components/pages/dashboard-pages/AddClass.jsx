import { addClassForm, getUserData } from '../../../util/DataBaseRequests';

import ClassForm from './ClassForm';
import Loader from '../../common/Loader';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddClass = () => {
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
    availableTime: { date: '', startTime: '' },
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'classImage') {
      setFormData({ ...formData, classImage: e.target.files[0] });
    } else if (e.target.name === 'minAge' || e.target.name === 'maxAge') {
      setFormData({
        ...formData,
        ages: {
          ...formData.ages,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === 'date' || e.target.name === 'startTime')
      setFormData({
        ...formData,
        availableTime: {
          ...formData.availableTime,
          [e.target.name]: e.target.value,
        },
      });
    else if (e.target.name === 'startTime')
      setFormData({ ...formData, [e.target.name]: e.target.value });
    else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubjects = (value) => {
    setCategory(value);
    setFormData({ ...formData, category: value.value });
    setFormErrors((formErrors) => ({
      ...formErrors,
      category: ''
  }));
  };

  const createMultipartForm = (data) => {
    const multipartForm = new FormData();

    for (let key in data) {
      if (key === 'ages') {
        multipartForm.append('ages[minAge]', data.ages.minAge);
        multipartForm.append('ages[maxAge]', data.ages.maxAge);
      } else if (key === 'availableTime') {
        multipartForm.append(
          'availableTime[date]',
          new Date(data.availableTime.date)
        );
        multipartForm.append(
          'availableTime[startTime]',
          data.availableTime.startTime
        );
      } else if (data[key] !== null && data[key] !== undefined) {
        multipartForm.append(key, data[key]);
      }
    }
    return multipartForm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.classTitle ||
      !formData.description ||
      !formData.price ||
      !formData.duration ||
      !formData.ages.minAge ||
      !formData.ages.maxAge ||
      !formData.type ||
      !formData.lessonType ||
      !formData.availableTime.date ||
      !formData.availableTime.startTime
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
        date: !formData.availableTime.date ? 'Please provide the date' : '',
        startTime: !formData.availableTime.startTime
          ? 'Please provide the start time'
          : '',
      });
      return;
    }

    const postedForm = createMultipartForm(formData);

    try {
      const response = await addClassForm(userData.token, postedForm);
      console.log(response);
      if (response.status === 201) {
        setIsLoading(true);
        const response = await getUserData(userData._id, userData.token);
        setUserData((userData) => ({
          ...userData,
          myClasses: response.data.myClasses,
        }));
        navigate('/dashboard/classes');
        setIsLoading(false);
        setFormErrors({});
      }
    } catch (error) {
      console.log('error', error.data.error);
      setFormErrors({ ...formErrors, form: error.data.error });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ClassForm
          onChange={handleChange}
          onHandleSubjects={handleSubjects}
          category={category}
          onSubmit={handleSubmit}
          formErrors={formErrors}
        />
      )}
    </>
  );
};

export default AddClass;