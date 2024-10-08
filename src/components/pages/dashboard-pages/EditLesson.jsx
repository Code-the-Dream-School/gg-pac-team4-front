import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLessonDetails, editLesson } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import EditLessonForm from './EditLessonForm';

const EditLesson = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const location = useLocation();
  const { selectedStudentId, lessonId } = location.state || {};

  const [formData, setFormData] = useState({
    lessonTitle: '',
    classId: '',
    lessonDescription: '',
    type: '',
    hometask: '',
    lessonSchedule: { date: '', startTime: '' },
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = userData.token;
      try {
        const response = await getLessonDetails(
          token,
          selectedStudentId,
          lessonId
        );
        const lessonInfo = response.data.lesson;

        setFormData({
          lessonTitle: lessonInfo.lessonTitle || '',
          classId: lessonInfo.classId || '',
          lessonDescription: lessonInfo.lessonDescription || '',
          type: lessonInfo.type || '',
          hometask: lessonInfo.hometask || '',
          lessonSchedule: {
            date: formatDate(lessonInfo.lessonSchedule?.date),
            startTime: lessonInfo.lessonSchedule?.startTime || '',
          },
        });
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setFormErrors({
          form: 'Error fetching lesson details. Please try again.',
        });
      }
    };

    fetchLessons();
  }, [userData.token, selectedStudentId, lessonId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (
      name === 'lessonSchedule.date' ||
      name === 'lessonSchedule.startTime'
    ) {
      // Update specific date or time field
      setFormData((prevData) => ({
        ...prevData,
        lessonSchedule: {
          ...prevData.lessonSchedule,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      // Update all other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = userData.token;

    // Check for required fields
    const errors = {};
    if (!formData.lessonTitle) errors.lessonTitle = 'Lesson title is required';
    if (!formData.lessonSchedule?.date)
      errors['lessonSchedule.date'] = 'Lesson date is required';
    if (!formData.lessonSchedule?.startTime)
      errors['lessonSchedule.startTime'] = 'Lesson start time is required';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await editLesson(token, formData, selectedStudentId, lessonId);
      navigate('/dashboard/students');
    } catch (error) {
      setFormErrors({
        form: error.message || 'An error occurred',
      });
      console.error('Error updating lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditLessonForm
      formData={formData}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditLesson;
