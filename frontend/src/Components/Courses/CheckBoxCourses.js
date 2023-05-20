import React, { useState } from "react";
import "../../CSS/DropList.css";
import "../../CSS/CheckBox.css";

const CheckBoxCourses = ({
  elementCourses,
  setElementCourses,
  courses,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (index) => {
    const newCourses = [...elementCourses];
    newCourses[index] = !newCourses[index];
    setElementCourses(newCourses);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    `${course.subject}${course.courseNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          className="search-checkbox"
          type="text"
          placeholder="courses..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="checkbox-courses">
        {filteredCourses.map((course, index) => (
          <div key={course.id}>
            <label className="checkbox-item">
              <input
                className="checkbox-item"
                type="checkbox"
                checked={elementCourses[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              {`${course.subject} ${course.courseNumber}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxCourses;
