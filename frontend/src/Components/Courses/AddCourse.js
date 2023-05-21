import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DropListSubjects from "./DropListSubjects";
import DropListCourses from "./DropListCourses";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCourses } from "../Public/App";
import {
  COURSENUMBERREGEX,
  TITLEREGEX,
  CREDITSNUMBERREGEX,
} from "../Public/ValidationRegex";

const AddCourse = ({ courses, setCourses, close }) => {
  const [subject, setSubject] = useState("");

  const [courseNumber, setCourseNumber] = useState("");
  const [validCourseNumber, setValidCourseNumber] = useState(false);
  const [courseNumberFocus, setCourseNumberfocus] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState("");
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [preReqs, setPreReqs] = useState([""]);
  const [coReqs, setCoReqs] = useState([""]);
  const [substitute, setSubstitute] = useState([""]);

  const [errMsg, setErrMsg] = useState("");
  const [displayBorderRed, setDisplayBorderRed] = useState(false); //change borders to red
  const [displayMessage, setDisplayMessage] = useState(false); //after submitting (return or another input)

  const getCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      if (response.data["message"] === "success") {
        setCourses(response.data["courses"]);
      }
    } catch (exception) {}
  };

  // Checks if the course number is valid
  useEffect(() => {
    setValidCourseNumber(COURSENUMBERREGEX.test(courseNumber));
  }, [courseNumber]);

  // Checks if the title is valid
  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  // Checks if the credits number is valid
  useEffect(() => {
    setValidCreditsNumber(CREDITSNUMBERREGEX.test(creditsNumber));
  }, [creditsNumber]);

  // Resets the error message when any of the input fields change
  useEffect(() => {
    setErrMsg("");
  }, [courseNumber, title, creditsNumber]);

  // Closes the form
  const handleClose = () => {
    close();
  };

  const handleDisplay = () => {
    setDisplayMessage(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handles invalid input and displays error message
    const handleInvalidInput = (errorMsg) => {
      setErrMsg(errorMsg);
      setDisplayBorderRed(true);
      setTimeout(() => {
        setDisplayBorderRed(false);
      }, 400);
    };

    if (subject === "") {
      handleInvalidInput("Invalid Entry, check subject");
      return;
    }

    if (!COURSENUMBERREGEX.test(courseNumber)) {
      handleInvalidInput("Please enter a valid course number");
      return;
    }

    if (!TITLEREGEX.test(title)) {
      handleInvalidInput("Please enter a valid title");
      return;
    }

    if (!CREDITSNUMBERREGEX.test(creditsNumber)) {
      handleInvalidInput("Please enter a valid credits number");
      return;
    }

    // Constructs relations and substitutes arrays
    const relations = [];
    const substitutes = [];
    preReqs.forEach((element) => {
      if (element !== "") {
        relations.push({
          secondCourse_id: parseInt(element),
          isPrerequisite: true,
        });
      }
    });

    coReqs.forEach((element) => {
      if (element !== "") {
        relations.push({
          secondCourse_id: parseInt(element),
          isPrerequisite: false,
        });
      }
    });
    substitute.forEach((element) => {
      if (element !== "") {
        substitutes.push(parseInt(element));
      }
    });

    // Constructs the new course object
    const newCourse = {
      subject,
      courseNumber,
      title,
      substitutes,
      creditsNumber: parseInt(creditsNumber),
    };

    const data = { course: newCourse, relations };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/courses",
        data
      );

      if (response.data.message === "Course Already exist") {
        handleInvalidInput("Course already exists");
        return;
      }

      if (response.data.message === "success") {
        getCourses(); // Refreshes the courses to get the values from the database
        setCourses([...courses, newCourse]);
        setSubject("");
        setCourseNumber("");
        setTitle("");
        setCreditsNumber("");
        setCoReqs([""]);
        setPreReqs([""]);
        setErrMsg("");
        setDisplayMessage(true);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`add-form ${displayBorderRed ? "empty-fields" : ""}`}
    >
      {displayMessage ? (
        <div>
          <div className="message-container">
            <p className="successful-submit">Doctor has been added</p>
          </div>
          <div className="form-footer-btns">
            <button onClick={handleClose} className="close-btn">
              close
            </button>
            <button onClick={handleDisplay} className="add-form-submit">
              Add Another doctor
            </button>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1 className="add-form-title">Add Course</h1>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="add-form-input">
            <label htmlFor="subject">Subject:</label>
            <DropListSubjects subject={subject} setSubject={setSubject} />
          </div>
          <div>
            <label htmlFor="course-number">
              Course Number:
              <FontAwesomeIcon
                icon={faCheck}
                className={validCourseNumber ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validCourseNumber || !courseNumber
                    ? "hide invalid"
                    : "invalid"
                }
              />
            </label>
            <input
              type="text"
              value={courseNumber}
              onChange={(event) => setCourseNumber(event.target.value)}
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
              className={
                titleFocus && !validTitle ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Title is limited between 4 to 255 character
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
              type="text"
              id="credits-number"
              value={creditsNumber}
              onChange={(event) => setCreditsNumber(event.target.value)}
              onFocus={() => setCreditsNumberFocus(true)}
              onBlur={() => setCreditsNumberFocus(false)}
              className="add-input-field"
            />
            <p
              id="uidnote"
              className={
                creditsNumberFocus && !validCreditsNumber
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Credits number are limited between 1-5
            </p>
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
          <div className="add-form-input">
            <label htmlFor="co-req">Substitute course:</label>
            <DropListCourses
              elementCourses={substitute}
              setElementCourses={setSubstitute}
              courses={courses}
            />
          </div>
          <div></div>
          <div className="form-footer-btns">
            <button className="close-btn" onClick={close}>
              Close
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="add-form-submit"
            >
              Add Course
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddCourse;
