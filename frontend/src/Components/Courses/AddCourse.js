import React, { useState } from "react";

const AddCourse = ({ courses, setCourses }) => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [section, setSection] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCourse = { semester, subject, courseNumber, section, title };
    setCourses([...courses, newCourse]);
    setSemester("");
    setSubject("");
    setCourseNumber("");
    setSection("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Course</h1>
      <div>
        <label htmlFor="semester">Semester:</label>
        <input
          type="text"
          id="semester"
          value={semester}
          onChange={(event) => setSemester(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="course-number">Course Number:</label>
        <input
          type="text"
          id="course-number"
          value={courseNumber}
          onChange={(event) => setCourseNumber(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="section">Section:</label>
        <input
          type="text"
          id="section"
          value={section}
          onChange={(event) => setSection(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
