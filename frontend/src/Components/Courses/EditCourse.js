import React, { useState } from "react";

const AddCourse = ({ courses, setCourses }) => {
  const [subject, setSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [creditsNbr, setCreditsNbr] = useState("");
  const [preReq, setPreReq] = useState("");
  const [coReq, setCoReq] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newCourse = { subject, courseNumber, title, creditsNbr, preReq, coReq };
    setCourses([...courses, newCourse]);
    setSubject("");
    setCourseNumber("");
    setTitle("");
    setCreditsNbr("");
    setPreReq("");
    setCoReq("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Course</h1>
      <div>
        <label htmlFor="subject">Subject:</label>
        <select id="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
          <option value="">Select a subject</option>
          <option value="CSC">CSC</option>
          <option value="MTH">MTH</option>
          <option value="BIF">BIF</option>
          <option value="STA">STA</option>
        </select>
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
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="credits-number">Credits Number:</label>
        <input
          type="text"
          id="credits-number"
          value={creditsNbr}
          onChange={(event) => setCreditsNbr(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pre-req">Pre requisites:</label>
        <button> + </button>
        <input
          type="text"
          id="pre-req"
          value={preReq}
          onChange={(event) => setPreReq(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="co-req">Co requisites:</label>
        <input
          type="text"
          id="co-req"
          value={coReq}
          onChange={(event) => setCoReq(event.target.value)}
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
