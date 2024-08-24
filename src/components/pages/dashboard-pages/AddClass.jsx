import ClassForm from './ClassForm';
import { addClassForm } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import { useState } from 'react';

const AddClass = () => {
  const { userData, setUserData } = useAuth();
  const [category, setCategory] = useState(null); //state for select
  const [lessonTime, setLessonTime] = useState({});
  const [ages, setAges] = useState({});
  const [formData, setFormData] = useState({
    classTitle: '',
    category: category,
    description: '',
    classImage: {},
    price: '',
    duration: '',
    //ages: ages,
    type: '',
    lessonType: '',
    goal: '',
    experience: '',
    other: '',
    //availableTime: lessonTime,
    // date: lessonTime.date,
    // startTime: lessonTime.startTime,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'classImage')
      setFormData({ ...formData, classImage: e.target.files[0] });
    // else if (e.target.name === 'date' || e.target.name === 'startTime')
    //   setLessonTime({
    //     ...lessonTime, [e.target.name]: e.target.value
    //     });
    else if (e.target.name === 'date')
      setLessonTime({
        ...lessonTime,
        [e.target.name]: new Date(
          new Date(e.target.value).toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) //this is nessesary, otherwise we get the previous day
        ),
      });
    else if (e.target.name === 'startTime')
      setLessonTime({ ...lessonTime, [e.target.name]: e.target.value });
    else if (e.target.name === 'minAge' || e.target.name === 'maxAge')
      setAges({ ...ages, [e.target.name]: e.target.value });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  };

  const handleSubjects = (value) => {
    setCategory(value);
    setFormData({ ...formData, category: value.value });
  };

  const checkFormErrors = (formData, ages, lessonTime) => {
    if (!formData.classTitle || !formData.description || !formData.email) {
      setFormErrors({
        ...formErrors,
        classTitle: !formData.classTitle
          ? 'Please provide your class title'
          : '',
        description: !formData.description
          ? 'Please provide your class description'
          : '',
        price: !formData.price ? 'Please provide the class price' : '',
        duration: !formData.duration ? 'Please provide the duration' : '',
        minAge: !ages.minAge ? 'Please provide the minimum age' : '',
        maxAge: !ages.maxAge ? 'Please provide the maximum age' : '',
        lessonType: !formData.lessonType
          ? 'Please specify the lesson type'
          : '',
        type: !formData.type ? 'Please provide the type of class' : '',
        date: !lessonTime.date ? 'Please provide the date' : '',
        startTime: !lessonTime.startTime ? 'Please provide the start time' : '',
      });
      return;
    }
  };
  
  const createMultipartForm = (mainData, timeData, ageData) => {
    const multipartForm = new FormData();
    for (let key in mainData) {
      if (key === 'price' || key === 'duration') {
        continue;
      }
      multipartForm.append(`${key}`, mainData[key]);
    }
    multipartForm.append('price', Number(mainData.price));
    multipartForm.append('duration', Number(mainData.duration));
    
    // multipartForm.append('classTitle', mainData.classTitle);
    // multipartForm.append('category', mainData.category);
    // multipartForm.append('description', mainData.description);
    // multipartForm.append('classImage', mainData.classImage);
    // multipartForm.append('type', mainData.type);
    // multipartForm.append('lessonType', mainData.lessonType);
    // multipartForm.append('goal', mainData.goal);
    // multipartForm.append('experience', mainData.experience);
    // multipartForm.append('other', mainData.other);

    
    multipartForm.append('availableTime', timeData);
    // multipartForm.append('availableTime', timeData.date);
    // multipartForm.append('availableTime', timeData.startTime);
    console.log('date', timeData.date);
    console.log('time data', timeData)
    
    // multipartForm.append('ages.minAge', Number(ageData.minAge));
    // multipartForm.append('ages.maxAge', Number(ageData.minAge));
    
    multipartForm.append('ages', ageData);
    console.log('ages data', ageData);
    console.log('ages max', Number(ageData.maxAge))
    
    
    console.log(multipartForm);
    return multipartForm;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkFormErrors(formData, ages, lessonTime);
    //   setIsLoading(true);
    console.log('error form', formErrors);
    // const multiFormData = new FormData();
    const postedForm = createMultipartForm(formData, lessonTime, ages);
    
    try {
      const response = await addClassForm(userData.token, postedForm);
      console.log(response);
    } catch (error) {
      console.log('error', error)
    }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  console.log('form',formData);
  // console.log('ages', ages);
  // console.log('lesson',lessonTime);

  return (
    <ClassForm
      onChange={handleChange}
      onHandleSubjects={handleSubjects}
      category={category}
      onSubmit={handleSubmit}
    />
  );
};

export default AddClass;