import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DropListSubjects from "./DropListSubjects";
import DropListCourses from "./DropListCourses";

const EditCourse = ({ courses, setCourses }) => {
  const { id } = useParams();
  const history = useNavigate();

  const course = courses.find((course) => course.id === parseInt(id));
  const [subject, setSubject] = useState(course.subject || "");
  const [courseNumber, setCourseNumber] = useState(course.courseNumber || "");
  const [title, setTitle] = useState(course.title || "");
  const [creditsNbr, setCreditsNbr] = useState(course.creditsNbr || "");

  const [preReqs, setPreReqs] = useState(course.preReq || [""]);
  const [coReqs, setCoReqs] = useState(course.coReq || [""]);

  if (!course) {
    return <div>Course not found.</div>;
  }

  const isValidCourseNumber = (courseNumber) => {
    const regex = /^[0-9]{3}[A-Z]?[A-Z]?$/;
    return regex.test(courseNumber);
  };

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

    const updatedCourse = {
      ...course,
      subject,
      courseNumber,
      title,
      creditsNbr,
      preReq: preReqs.filter((pr) => pr !== ""), // Remove any empty strings from the preReq1 array
      coReq: coReqs.filter((cr) => cr !== ""),
    };

    const index = courses.findIndex((course) => course.id === parseInt(id));
    const updatedCourses = [
      ...courses.slice(0, index),
      updatedCourse,
      ...courses.slice(index + 1),
    ];
    setCourses(updatedCourses);
    history.push("/");
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <DropListSubjects subject={subject} setSubject={setSubject} />
        <br />
        <label htmlFor="courseNumber">Course Number:</label>
        <input
          type="text"
          id="courseNumber"
          value={courseNumber}
          onChange={(event) =>
            setCourseNumber(event.target.value.toUpperCase())
          }
        />
        {isValidCourseNumber(courseNumber) ? null : (
          <span className="error">Invalid course number format.</span>
        )}
        <br />
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="creditsNbr">Credits:</label>
        <input
          type="number"
          id="creditsNbr"
          value={creditsNbr}
          onChange={(event) => setCreditsNbr(event.target.value)}
          min="0"
          max="5"
        />
        {creditsNbr === "" || (creditsNbr >= 0 && creditsNbr <= 5) ? null : (
          <span className="error">Credits must be between 0 and 5.</span>
        )}
        <br />
        <label htmlFor="preReqs">Prerequisites:</label>
        <DropListCourses
          elementCourses={coReqs}
          setElementCourses={setCoReqs}
          courses={courses}
        />
        <br />
        <label htmlFor="coReqs">Corequisites:</label>
        <DropListCourses
          elementCourses={preReqs}
          setElementCourses={setPreReqs}
          courses={courses}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCourse;
