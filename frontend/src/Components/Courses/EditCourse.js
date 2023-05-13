import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropListSubjects from "./DropListSubjects";
import DropListCourses from "./DropListCourses";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const courseNumberRegex = /^[0-9]{3}[A-Z]?[A-Z]?$/;

const titleRegex = /^.{10,255}$/;

const creditsNumberRegex = /^[1-5]$/;

const EditCourse = ({ courses, setCourses, id, close }) => {
  const history = useNavigate();

  const course = courses.find((course) => course.id === parseInt(id));

  const [subject, setSubject] = useState(course.subject || "");

  const [courseNumber, setCourseNumber] = useState(course.courseNumber || "");
  const [validCourseNumber, setValidCourseNumber] = useState(false);
  const [courseNumberFocus, setCourseNumberfocus] = useState(false);

  const [title, setTitle] = useState(course.title || "");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState(
    course.creditsNumber || ""
  );
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [preReqs, setPreReqs] = useState(course.preReq || [""]);
  const [coReqs, setCoReqs] = useState(course.coReq || [""]);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidCourseNumber(courseNumberRegex.test(courseNumber));
  }, [courseNumber]);

  useEffect(() => {
    setValidTitle(titleRegex.test(title));
  }, [title]);

  useEffect(() => {
    setValidCreditsNumber(creditsNumberRegex.test(creditsNumber));
  }, [creditsNumber]);

  useEffect(() => {
    setErrMsg("");
  }, [courseNumber, title, creditsNumber]);

  if (!course) {
    return <div>Course not found.</div>;
  }

  const isValidCourseNumber = (courseNumber) => {
    const regex = /^[0-9]{3}[A-Z]?[A-Z]?$/;
    return regex.test(courseNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (subject === "") {
      setErrMsg("Invalid Entry, check subject");
      return;
    } else if (
      subject === "" ||
      !courseNumberRegex.test(courseNumber) ||
      !titleRegex.test(title) ||
      !creditsNumberRegex.test(creditsNumber)
    ) {
      return; // Return early if any of the state variables are empty
    }

    const updatedCourse = {
      ...course,
      subject,
      courseNumber,
      title,
      creditsNumber,
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
    history.push("/courses");
  };

  return (
    <div className="add-form">
      <h1 className="add-form-title">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-form-input">
          <label htmlFor="subject">Subject:</label>
          <DropListSubjects subject={subject} setSubject={setSubject} />
        </div>
        <div className="add-form-input">
          <label htmlFor="course-number">
            Course Number:
            <FontAwesomeIcon
              icon={faCheck}
              className={validCourseNumber ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validCourseNumber || !courseNumber ? "hide invalid" : "invalid"
              }
            />
          </label>
          <input
            type="text"
            id="course-number"
            value={courseNumber}
            onChange={(event) =>
              setCourseNumber(event.target.value.toUpperCase())
            }
            onFocus={() => setCourseNumberfocus(true)}
            onBlur={() => setCourseNumberfocus(false)}
            className="add-input-field"
          />
          <p
            id="uidnote"
            className={
              courseNumberFocus && !validCourseNumber
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Format Example: 498 or 498A or 498AA
          </p>
        </div>
        <div className="add-form-input">
          <label htmlFor="title">
            Title:
            <FontAwesomeIcon
              icon={faCheck}
              className={validTitle ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validTitle || !title ? "hide invalid" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onFocus={() => setTitleFocus(true)}
            onBlur={() => setTitleFocus(false)}
            className="add-input-field"
          />
          <p
            id="uidnote"
            className={titleFocus && !validTitle ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Title is limited between 10 to 255 character
          </p>
        </div>
        <div className="add-form-input">
          <label htmlFor="credits-number">
            Credits Number:
            <FontAwesomeIcon
              icon={faCheck}
              className={validCreditsNumber ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validCreditsNumber || !creditsNumber
                  ? "hide invalid"
                  : "invalid"
              }
            />
          </label>
          <input
            type="number"
            id="credits-number"
            value={creditsNumber}
            onChange={(event) => setCreditsNumber(event.target.value)}
            onFocus={() => setCreditsNumberFocus(true)}
            onBlur={() => setCreditsNumberFocus(false)}
            className="add-input-field"
          />
          {creditsNumber === "" ||
          (creditsNumber >= 0 && creditsNumber <= 5) ? null : (
            <span className="error">Credits must be between 0 and 5.</span>
          )}
        </div>
        <div className="add-form-input">
          <label htmlFor="pre-req">Prerequisites:</label>
          <DropListCourses
            elementCourses={coReqs}
            setElementCourses={setCoReqs}
            courses={courses}
          />
        </div>
        <div className="add-form-input">
          <label htmlFor="co-req">Corequisites:</label>
          <DropListCourses
            elementCourses={preReqs}
            setElementCourses={setPreReqs}
            courses={courses}
          />
        </div>
        <div className="add-form-input">
          <button type="submit" className="add-form-submit">
            Save
          </button>
          <button className="close-btn" onClick={close}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
