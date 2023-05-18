import React, { useState, useEffect } from "react";
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

const courseNumberRegex = /^[0-9]{3}[A-Z]?[A-Z]?$/;

const titleRegex = /^.{10,255}$/;

const CREDITSNUMBERREGEX = /^[1-5]$/;

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

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidCourseNumber(courseNumberRegex.test(courseNumber));
  }, [courseNumber]);

  useEffect(() => {
    setValidTitle(titleRegex.test(title));
  }, [title]);

  useEffect(() => {
    setValidCreditsNumber(CREDITSNUMBERREGEX.test(creditsNumber));
  }, [creditsNumber]);

  useEffect(() => {
    setErrMsg("");
  }, [courseNumber, title, creditsNumber]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (subject === "") {
      setErrMsg("Invalid Entry, check subject");
      return;
    } else if (
      subject === "" ||
      !courseNumberRegex.test(courseNumber) ||
      !titleRegex.test(title) ||
      !CREDITSNUMBERREGEX.test(creditsNumber)
    ) {
      return; // Return early if any of the state variables are empty
    }
    const newCourse = {
      subject,
      courseNumber,
      title,
      creditsNumber,
      preReq: preReqs.filter((pr) => pr !== ""), // Remove any empty strings from the preReq1 array
      coReq: coReqs.filter((cr) => cr !== ""),
    };
    const course = {};
    const relations = [];
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
    course["subject"] = subject;
    course["courseNumber"] = courseNumber;
    course["title"] = title;
    course["creditsNumber"] = parseInt(creditsNumber);
    const data = { course: course, relations: relations };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/courses",
        data
      );
      if (response.data["message"] === "success") {
        setCourses([...courses, newCourse]);
        setSubject("");
        setCourseNumber("");
        setTitle("");
        setCreditsNumber("");
        setCoReqs([""]);
        setPreReqs([""]);
        setErrMsg("");
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
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
              validCourseNumber || !courseNumber ? "hide invalid" : "invalid"
            }
          />
        </label>
        <input
          type="text"
          value={courseNumber}
          onChange={(event) => setCourseNumber(event.target.value)}
          autocomplete="off"
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
              validCreditsNumber || !creditsNumber ? "hide invalid" : "invalid"
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
      <div></div>
      <button type="submit" onClick={handleSubmit} className="add-form-submit">
        Add Course
      </button>
      <button className="close-btn" onClick={close}>
        Close
      </button>
    </form>
  );
};

export default AddCourse;
