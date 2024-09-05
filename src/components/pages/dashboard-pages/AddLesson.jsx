import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClassesData, addLesson } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import FormLesson from './LessonForm';

const AddLesson = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const location = useLocation();
  const { selectedStudentId } = location.state || {};
  const [filteredClasses, setFilteredClasses] = useState([]);
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
    const fetchClasses = async () => {
      try {
        const response = await getClassesData();
        const classes = response.classes;
        const filteredClasses = classes.filter(
          (classItem) =>
            classItem.createdBy === userData._id &&
            classItem.classStudents?.some(
              (student) => student.userId === selectedStudentId
            )
        );
        setFilteredClasses(filteredClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [userData, selectedStudentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date' || name === 'startTime') {
      setFormData({
        ...formData,
        lessonSchedule: {
          ...formData.lessonSchedule,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.classId ||
      !formData.lessonTitle ||
      !formData.lessonSchedule.date ||
      !formData.lessonSchedule.startTime ||
      !formData.type
    ) {
      setFormErrors({
        ...formErrors,
        classId: !formData.classId ? 'Please select a class' : '',
        lessonTitle: !formData.lessonTitle
          ? 'Please provide a lesson title'
          : '',
        'lessonSchedule.date': !formData.lessonSchedule.date
          ? 'Please provide the date'
          : '',
        'lessonSchedule.startTime': !formData.lessonSchedule.startTime
          ? 'Please provide the start time'
          : '',
        type: !formData.type ? 'Please select the lesson type' : '',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await addLesson(
        userData.token,
        formData,
        selectedStudentId
      );
      if (response.status === 201) {
        navigate('/dashboard/students');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormErrors({
        ...formErrors,
        form: error.message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLesson
      formData={formData}
      formErrors={formErrors}
      filteredClasses={filteredClasses}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddLesson;
