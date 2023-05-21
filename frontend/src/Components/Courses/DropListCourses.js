import { useState } from "react";
import "../../CSS/DropList.css";

const DropListCourses = ({
  elementCourses,
  setElementCourses,
  courses,
  disabled,
}) => {
  // Adds a new course to the list of selected courses
  const addCoursesList = (event) => {
    event.preventDefault();
    setElementCourses([...elementCourses, ""]);
  };

  // Handles the change event for the selected course in the list add it to the selected courses
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
