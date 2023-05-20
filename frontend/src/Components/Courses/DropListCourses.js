import { useState } from "react";
import "../../CSS/DropList.css";

const DropListCourses = ({
  elementCourses,
  setElementCourses,
  courses,
  disabled,
}) => {
  const addCoursesList = (event) => {
    event.preventDefault();
    setElementCourses([...elementCourses, ""]);
  };

  const handleChangeCourses = (indexCourses, newCourse) => {
    const newCourses = [...elementCourses];
    newCourses[indexCourses] = newCourse;
    setElementCourses(newCourses);
  };

  return (
    <div>
      <div>
        {elementCourses.map((selectedCourse, index) => (
          <select
            key={index}
            value={selectedCourse}
            onChange={(event) => handleChangeCourses(index, event.target.value)}
          >
            <option value="">None</option>

            {courses
              .sort((courses, NCourse) =>
                courses.subject.localeCompare(NCourse.subject)
              )
              .map((course) => (
                <option key={course.id} value={parseInt(course.id)}>
                  {`${course.subject} ${course.courseNumber}`}
                </option>
              ))}
          </select>
        ))}
        {!disabled ? (
          <button className="add-list-btn" onClick={addCoursesList}>
            +
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DropListCourses;
