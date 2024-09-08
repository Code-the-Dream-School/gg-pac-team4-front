import ClassForm from './ClassForm';
import Loader from '../../common/Loader';
import useClasses from '../../../util/ClassService';

const AddClass = () => {
  const{
    handleSubmit,
    handleSubjects,
    handleChange,
    handleAddTime,
    returnToClasses,
    formErrors,
    formData,
    isLoading,
    category
} = useClasses();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <h1 className="text-black font-semibold text-xl sm:text-2xl font-spartan my-4">
        Add a new class
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

export default AddClass;
