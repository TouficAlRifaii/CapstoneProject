import React, { useState, useEffect } from "react";
import DropListCourses from "../Courses/DropListCourses";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CheckBoxCourses from "../Courses/CheckBoxCourses";

import { TITLEREGEX, CREDITSMAJORREGEX } from "../Public/ValidationRegex";

const EditMajor = ({ majors, setMajors, id, close, courses }) => {
  const major = majors.find((m) => m.id === id);

  const [title, setTitle] = useState(major.title);
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState(major.credits);
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [majorCourses, setMajorCourses] = useState(major.courses);

  // State variables for error messages and form submission status
  const [errMsg, setErrMsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  // Function to fetch the list of majors
  const getMajors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/major");
      if (response.data["message"] === "success") {
        setMajors(response.data["majors"]);
      }
    } catch (exception) {}
  };

  // useEffect hook to validate the title field when it changes
  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);
  // useEffect hook to validate the creditsNumber field when it changes
  useEffect(() => {
    setValidCreditsNumber(CREDITSMAJORREGEX.test(creditsNumber));
  }, [creditsNumber]);
  // useEffect hook to clear the error message when title or creditsNumber change
  useEffect(() => {
    setErrMsg("");
  }, [title, creditsNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!TITLEREGEX.test(title)) {
      setErrMsg("Please enter a valid title.");
      setEmptyFields(true);

      setTimeout(() => {
        setEmptyFields(false);
      }, 400);

      return;
    }

    if (!CREDITSMAJORREGEX.test(creditsNumber)) {
      setErrMsg("Please enter a valid credits number.");
      setEmptyFields(true);

      setTimeout(() => {
        setEmptyFields(false);
      }, 400);

      return;
    }

    if (majorCourses.length === 0) {
      setErrMsg("Please select at least one major course.");
      setEmptyFields(true);

      setTimeout(() => {
        setEmptyFields(false);
      }, 400);

      return;
    }
    const filteredMajorCourses = majorCourses.filter((course) => course);
    const newMajor = {
      id: id,
      title: title,
      credits: parseInt(creditsNumber),
      courses: filteredMajorCourses,
    };

    axios
      .post("http://127.0.0.1:8000/api/major/update", newMajor)
      .then((response) => {
        // Handle successful response if needed
        getMajors();
      })
      .catch((error) => {
        getMajors();

        // Handle error if needed
      });
    setErrMsg("");
    setTitle("");
    setCreditsNumber("");
    setMajorCourses([]);
    close();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`add-form ${emptyFields ? "empty-fields" : ""}`}
    >
      <div>
        <h1 className="add-form-title">Add Major</h1>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <div className="add-form-input">
          <label htmlFor="title">
            Major Title:
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
            id="title"
            value={title}
            autoFocus={false}
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
        <div>
          <label htmlFor="creditsNumber">
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
            Credits number between 1-150
          </p>
        </div>
        <div className="add-form-input">
          <label htmlFor="majorCourses">Major Courses</label>
          <CheckBoxCourses
            elementCourses={majorCourses}
            setElementCourses={setMajorCourses}
            courses={courses}
          />
        </div>
        <div>
          <div className="form-footer-btns">
            <button className="close-btn" onClick={close}>
              Close
            </button>
            <button type="submit" className="add-form-submit">
              Add Major
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditMajor;
