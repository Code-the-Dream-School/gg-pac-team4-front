import ClassForm from './ClassForm';
import { useState } from 'react';
const AddClass = () => {
  const [category, setCategory] = useState(null); //state for select
  const [lessonTime, setLessonTime] = useState({
  });
  const [ages, setAges] = useState({
});
  const [formData, setFormData] = useState({
    // classTitle: '',
    // description: '',
    // price: '',
    // duration: '',
    // type: 'online',
    // lessonType: 'Group',
    // goal: '',
    // experience: '',
    // other: '',
    // date: {},
    // startTime: '',
    // category: category,
    // classImage: {},
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'classImage')
      setFormData({ ...formData, classImage: e.target.files[0] });
    else if (e.target.name === 'date')
        setLessonTime({
        ...lessonTime,
        [e.target.name]: new Date(
          new Date(e.target.value).toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })//this is nessesary, otherwise we get the previous day
        ),
      });
    else if (e.target.name === 'startTime') setLessonTime({...lessonTime, [e.target.name]: e.target.value });
    else if (e.target.name === 'minAge' || e.target.name === 'maxAge') setAges({...ages, [e.target.name]: e.target.value });
    //else if (e.target.name === 'minAge') setFormData({...formData, [e.target.name]: e.target.value });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  };

  const handleSubjects = (value) => {
    setCategory(value);
    setFormData({ ...formData, category: value.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.classTitle || !formData.description|| !formData.email) {
        setFormErrors({
          ...formErrors,
          classTitle : !formData.classTitle ? 'Please provide your class title' : '',
          description: !formData.description? 'Please provide your class description' : '',
          price: !formData.price ? 'Please provide the class price' : '',
          duration: !formData.duration ? 'Please provide the duration' : '',
          minAge: !ages.minAge ? 'Please provide the minimum age' : '',
          maxAge: !ages.maxAge ? 'Please provide the maximum age' : '',
          lessonType: !formData.lessonType ? 'Please specify the lesson type' : '',
          type: !formData.type ? 'Please provide the date' : '',
          date: !lessonTime.date ? 'Please provide the type of class' : '',
          startTime: !lessonTime.startTime ? 'Please provide the start time' : '',
        });
        return;
      }
  }

  console.log('form',formData);
  console.log('ages', ages);
  console.log('lesson',lessonTime);
  console.log('error', formErrors);
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