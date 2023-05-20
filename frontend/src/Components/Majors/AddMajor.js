import React, { useEffect, useState } from "react";
import CheckBoxCourses from "../Courses/CheckBoxCourses";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { TITLEREGEX, CREDITSMAJORREGEX } from "../Public/ValidationRegex";

const AddMajor = ({ majors, setMajors, courses, close }) => {
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState("");
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [majorCourses, setMajorCourses] = useState([""]);

  const [errMsg, setErrMsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const getMajors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/major");
      if (response.data["message"] === "success") {
        setMajors(response.data["majors"]);
      }
    } catch (exception) {}
  };

  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidCreditsNumber(CREDITSMAJORREGEX.test(creditsNumber));
  }, [creditsNumber]);

  useEffect(() => {
    setErrMsg("");
  }, [title, creditsNumber]);
  const handleClose = () => {
    close();
  };

  const handleDisplay = () => {
    setDisplayMessage(false);
  };
  function validateInputs(title, creditsNumber, majorCourses) {
    if (!TITLEREGEX.test(title)) {
      setErrMsg("Invalid title. Please enter a valid title.");
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 400);
      return false;
    }

    if (!CREDITSMAJORREGEX.test(creditsNumber)) {
      setErrMsg("Invalid credits number. Please enter a valid number.");
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 400);
      return false;
    }

    if (majorCourses.length === 0) {
      setErrMsg(
        "No major courses selected. Please select at least one course."
      );
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 400);
      return false;
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs(title, creditsNumber, majorCourses)) {
      return;
    }

    const newMajor = {
      title,
      credits: parseInt(creditsNumber),
      majorCourses: majorCourses,
    };

    axios
      .post("http://127.0.0.1:8000/api/major", newMajor)
      .then((response) => {
        // Handle successful response if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
    getMajors();

    setErrMsg("");
    setTitle("");
    setCreditsNumber("");
    setMajorCourses([]);
    setDisplayMessage(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`add-form ${emptyFields ? "empty-fields" : ""}`}
    >
      {displayMessage ? (
        <div>
          <div className="message-container">
            <p className="successful-submit">Major has been added</p>
          </div>
          <div className="form-footer-btns">
            <button onClick={handleClose} className="close-btn">
              close
            </button>
            <button onClick={handleDisplay} className="add-form-submit">
              Add Another Major
            </button>
          </div>
        </div>
      ) : (
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
              className={
                titleFocus && !validTitle ? "instructions" : "offscreen"
              }
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
              Credits number between 1-100
            </p>
          </div>
          <div className="add-form-input">
            <label htmlFor="majorCourses">Major Courses: </label>
            <div>
              <CheckBoxCourses
                elementCourses={majorCourses}
                setElementCourses={setMajorCourses}
                courses={courses}
              />
            </div>
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
      )}
    </form>
  );
};

export default AddMajor;
