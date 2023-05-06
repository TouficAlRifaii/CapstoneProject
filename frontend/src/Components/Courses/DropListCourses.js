import { useState } from "react";
import "../../CSS/DropList.css";

const DropListCourses = ({ elementCourses, setElementCourses, courses }) => {
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

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {`${course.subject} ${course.courseNumber}`}
              </option>
            ))}
          </select>
        ))}
        <button onClick={addCoursesList}>+</button>
      </div>
    </div>
  );
};

export default DropListCourses;
