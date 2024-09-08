import { formatDateWithWeekday } from "../../util/NotificationsUtils";

const LessonsTable = ({ lessonList, title }) => {
  return (
    <div className="w-full">
      <h2 className="font-medium text-lg lg:text-xl px-6">{title}</h2>
      <div className="overflow-x-auto mt-2 rounded">
        <div className="min-w-full bg-white">
          {/* header */}
          <div className="hidden lg:flex bg-lightGreen text-lg font-medium">
            <div className="p-2 flex-1 text-center">Lesson title</div>
            <div className="p-2 flex-1 text-center">Description</div>
            <div className="p-2 flex-1 text-center">Date</div>
            <div className="p-2 flex-1 text-center">Start time</div>
            <div className="p-2 flex-1 text-center">Additional information</div>
          </div>
          {/* rows */}
          <div>
            {lessonList.map((lesson) => (
              <div
                key={lesson.lessonTitle}
                className="lg:flex text-xs md:text-sm text-center hover:bg-gray-50"
              >
                {/* small screens */}
                <div className="lg:hidden flex flex-col border-t border-lightGreen g-2">
                  <div className="flex justify-between p-2">
                    <div className="font-medium">Lesson title:</div>
                    <div>{lesson.lessonTitle}</div>
                  </div>
                  <div className="flex justify-between p-2">
                    <div className="font-medium">Description:</div>
                    <div>{lesson.lessonDescription}</div>
                  </div>
                  <div className="flex justify-between p-2">
                    <div className="font-medium">Date:</div>
                    <div>
                      {formatDateWithWeekday(lesson.date)}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <div className="font-medium">Start time:</div>
                    <div>{lesson.startTime}</div>
                  </div>
                  <div className="flex justify-between p-2">
                    <div className="font-medium">Additional information:</div>
                    <div>{lesson.hometask || 'None'}</div>
                  </div>
                </div>
                {/* large screens */}
                <div className="hidden lg:flex flex-1 border-t border-lightGreen">
                  <div className="p-2 flex-1">{lesson.lessonTitle}</div>
                  <div className="p-2 flex-1">{lesson.lessonDescription}</div>
                  <div className="p-2 flex-1">
                  {formatDateWithWeekday(lesson.date)}
                  </div>
                  <div className="p-2 flex-1">{lesson.startTime}</div>
                  <div className="p-2 flex-1">{lesson.hometask || 'None'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsTable;
