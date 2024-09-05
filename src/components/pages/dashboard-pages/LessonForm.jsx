import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../common/FormInput';

const LessonForm = ({
  formData,
  formErrors,
  filteredClasses,
  handleChange,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-black font-semibold text-xl sm:text-2xl font-spartan mb-4">
        Create New Lesson
      </h1>
      <form className="flex flex-col w-full max-w-xl" onSubmit={handleSubmit}>
        {formErrors.form && (
          <p className="text-red font-spartan mb-2">{formErrors.form}</p>
        )}
        <div className="flex flex-col gap-4">
          <label htmlFor="classSelect" className="hidden">
            Select a Class
          </label>
          <select
            id="classSelect"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="mt-4 mb-2 p-2 w-full text-sm placeholder:text-darkGray text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
          >
            <option value="">Select a class</option>
            {filteredClasses.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.classTitle}
              </option>
            ))}
          </select>
          {formErrors.classId && (
            <p className="text-red text-sm font-spartan">
              {formErrors.classId}
            </p>
          )}
          <FormInput
            placeholder=" "
            name="lessonTitle"
            value={formData.lessonTitle}
            onChange={handleChange}
            min="2"
            max="100"
          >
            Lesson Title
          </FormInput>
          {formErrors.lessonTitle && (
            <p className="text-red text-sm font-spartan">
              {formErrors.lessonTitle}
            </p>
          )}
          <div className="flex gap-4 items-center">
            <p className="w-1/4">Date & Time:</p>
            <div className="flex gap-4 w-3/4">
              <FormInput
                type="date"
                name="date"
                value={formData.lessonSchedule.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-1/2"
              />
              <FormInput
                type="time"
                name="startTime"
                value={formData.lessonSchedule.startTime}
                onChange={handleChange}
                className="w-1/2"
              />
            </div>
          </div>
          {formErrors['lessonSchedule.date'] && (
            <p className="text-red text-sm font-spartan">
              {formErrors['lessonSchedule.date']}
            </p>
          )}
          {formErrors['lessonSchedule.startTime'] && (
            <p className="text-red text-sm font-spartan">
              {formErrors['lessonSchedule.startTime']}
            </p>
          )}
          <div className="flex gap-4 my-4">
            <p className="w-1/4">Type:</p>
            <div className="flex flex-col gap-2 w-3/4">
              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="type"
                  value="online"
                  className="w-4 h-4 accent-lightGreen focus:darkGreen"
                  onChange={handleChange}
                />
                Online
              </label>
              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="type"
                  value="offline"
                  className="w-4 h-4 accent-lightGreen focus:darkGreen"
                  onChange={handleChange}
                />
                Offline
              </label>
            </div>
          </div>
          {formErrors.type && (
            <p className="text-red text-sm font-spartan">{formErrors.type}</p>
          )}
          {formErrors.lessonDescription && (
            <p className="text-red text-sm font-spartan">
              {formErrors.lessonDescription}
            </p>
          )}
          <textarea
            id="lessonDescription"
            aria-label="Lesson description"
            className="mt-4 mb-2 p-2 w-full h-24 text-sm placeholder:text-darkGray text-black bg-pureWhite rounded border-2 border-grey appearance-none focus:outline-none focus:ring-0 focus:border-black"
            placeholder="Description"
            name="lessonDescription"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="hometask"
            value={formData.hometask}
            onChange={handleChange}
            placeholder=" "
          >
            Additional information
          </FormInput>
        </div>
        <div className="flex gap-8 justify-center mt-4">
          <button
            type="submit"
            className="bg-darkGreen w-1/4 hover:bg-pureWhite hover:text-darkGreen hover:border-2 hover:border-darkGreen text-white font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 ease-in"
          >
            Save
          </button>
          <button
            type="button"
            className="w-1/4 bg-pureWhite text-yellow hover:bg-yellow hover:text-pureWhite border-2 border-yellow font-spartan font-semibold text-lg py-1 rounded-lg transition duration-300 ease-in"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
