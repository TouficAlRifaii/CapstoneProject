import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DropListSubjects from "./DropListSubjects";
import DropListCourses from "./DropListCourses";

const AddCourse = ({ courses, setCourses }) => {
  const [subject, setSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [creditsNbr, setCreditsNbr] = useState("");

  const [preReq1, setPreReq1] = useState("");
  const [preReq2, setPreReq2] = useState("");

  const [preReqs, setPreReqs] = useState([""]);
  const [coReqs, setCoReqs] = useState([""]);

  const [coReq1, setCoReq1] = useState("");
  const [coReq2, setCoReq2] = useState("");

  function isValidCourseNumber(courseNumber) {
    const regex = /^[0-9]{3}[A-Z]?[A-Z]?$/;
    return regex.test(courseNumber);
  }

  const handleSubmit = (event) => {
    if (
      subject === "" ||
      !isValidCourseNumber(courseNumber) ||
      title === "" ||
      creditsNbr === "" ||
      creditsNbr < 0 ||
      creditsNbr > 5
    ) {
      event.preventDefault();
      return; // Return early if any of the state variables are empty
    }

    event.preventDefault();

    const newCourse = {
      id: courses.length + 1,
      subject,
      courseNumber,
      title,
      creditsNbr,
      preReq: preReqs.filter((pr) => pr !== ""), // Remove any empty strings from the preReq1 array
      coReq: coReqs.filter((cr) => cr !== ""),
    };
    console.log(newCourse);
    setCourses([...courses, newCourse]);
    setSubject("");
    setCourseNumber("");
    setTitle("");
    setCreditsNbr("");
    setPreReq1("");
    setCoReq1("");
    setPreReq2("");
    setCoReq2("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title">Add Course</h1>
      <div className="add-form-input">
        <label htmlFor="subject">Subject:</label>
        <DropListSubjects subject={subject} setSubject={setSubject} />
      </div>
      <div>
        <label htmlFor="course-number">Course Number:</label>
        <input
          type="text"
          id="course-number"
          value={courseNumber}
          onChange={(event) => setCourseNumber(event.target.value)}
          className="add-input-field"
        />
        <label> Format Example: 498 or 498A or 498AA</label>
      </div>
      <div className="add-form-input">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="credits-number">Credits Number:</label>
        <input
          type="text"
          id="credits-number"
          value={creditsNbr}
          onChange={(event) => setCreditsNbr(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="pre-req">Pre requisites:</label>
        <DropListCourses
          elementCourses={preReqs}
          setElementCourses={setPreReqs}
          courses={courses}
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="co-req">Co requisites:</label>
        <DropListCourses
          elementCourses={coReqs}
          setElementCourses={setCoReqs}
          courses={courses}
        />
      </div>
      <div></div>
      <button type="submit" onClick={handleSubmit} className="add-form-submit">
        Add Course
      </button>{" "}
    </form>
  );
};

export default AddCourse;
