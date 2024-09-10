import { formatDateWithWeekday, formatDateWithoutWeekday } from '../../util/NotificationsUtils';

import CountdownTimer from '../../util/LessonsTimer';

const NextLessons = ({ nextTwoLessons }) => {
  return (
    <>
      {nextTwoLessons.length > 0 ? (
        <div className="flex gap-8 flex-col lg:flex-row">
          {nextTwoLessons.map((lesson) => {
            const lessonDate = new Date(lesson.lessonSchedule.date);
            const now = new Date();
            const daysRemaining = Math.floor(
              (lessonDate - now) / (1000 * 60 * 60 * 24)
            );
            return (
              <div
                key={lesson._id}
                className="bg-pureWhite w-full md:w-2/3 lg:w-2/5 rounded p-4 flex flex-col justify-between"
              >
                <div className="flex gap-4">
                  <img
                    src={lesson.teacherPhoto}
                    alt="teacher photo"
                    className="rounded-full w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col justify-around w-2/3">
                    <p className="font-medium">
                      {lesson.teacherFirstName}{' '}
                      {lesson.teacherLastName.slice(0, 1)}.
                    </p>
                    <p>{lesson.teacherCategory.join(' & ')} teacher</p>
                  </div>
                </div>
                <div className="h-1/2">
                  <h3 className="text-lg font-semibold my-2">
                    {lesson.classTitle}
                  </h3>
                  <h4 className="font-medium my-2">{lesson.lessonTitle}</h4>
                </div>
                <div>
                  <p className="mb-2">
                    {lesson.duration} min {lesson.type} lesson
                  </p>
                  {daysRemaining < 7 ? (
                    <CountdownTimer targetDate={lessonDate} />
                  ) : (
                    <p className="mb-2">
                      <span className="font-medium">Date:</span>{' '}
                      {formatDateWithoutWeekday(lessonDate) }{' '}
                      {lesson.lessonSchedule.startTime}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="ml-4">No lessons booked yet.</p>
      )}
    </>
  );
};

export default NextLessons;