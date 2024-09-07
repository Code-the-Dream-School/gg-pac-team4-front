import ClassForm from './ClassForm';
import Loader from '../../common/Loader';
import { getClassDetails } from '../../../util/DataBaseRequests';
import { useAuth } from '../../../AuthProvider';
import useClasses from '../../../util/ClassService';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditClass = () => {
  const { classId } = useParams();
  const { userData } = useAuth();
  const {
    handleSubmit,
    handleSubjects,
    handleChange,
    handleAddTime,
    returnToClasses,
    formErrors,
    formData,
    isLoading,
    category,
    setFormData,
    setIsLoading,
    setCategory,
    setFormErrors,
  } = useClasses();

  useEffect(() => {
    setIsLoading(true);
    const getClassData = async () => {
      try {
        const response = await getClassDetails(classId, userData.token);
        if (response.class) {
          setFormData({
            classTitle: response.class.classTitle,
            description: response.class.description,
            price: response.class.price,
            duration: response.class.duration,
            type: response.class.type,
            lessonType: response.class.lessonType,
            goal: response.class.goal,
            experience: response.class.experience,
            other: response.class.other,
            ages: {
              minAge: response.class.ages.minAge,
              maxAge: response.class.ages.maxAge,
            },
            availableTime: response.class.availableTime.map((time) => ({
              date: new Date(time.date).toISOString().split('T')[0],
              startTime: time.startTime,
            })),
          });
          setCategory({
            value: response.class.category,
            label: response.class.category,
          });
          setIsLoading(false);
        }
      } catch (error) {
        setFormErrors({ form: 'Error loading class data' });
        setIsLoading(false);
        console.log('Error loading class data', error);
      }
    };

    getClassData();
  }, [classId, userData.token]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-black font-semibold text-xl sm:text-2xl font-spartan my-4">
            Edit class
          </h1>
          <ClassForm
            onChange={handleChange}
            onHandleSubjects={handleSubjects}
            category={category}
            onSubmit={handleSubmit}
            formErrors={formErrors}
            formData={formData}
            onAddTime={handleAddTime}
            onReturn={returnToClasses}
          />
        </>
      )}
    </>
  );
};

export default EditClass;
