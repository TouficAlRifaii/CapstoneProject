import React, { useState, useEffect } from "react";
import DropListCourses from "../Courses/DropListCourses";
import AddSession from "./Sessions/AddSession";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { NAMEREGEX, TITLEREGEX } from "../Public/ValidationRegex";
import CheckboxDay from "./Sessions/CheckboxDay";
const AddDoctor = ({ doctors, setDoctors, courses, close }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [tCourses, setTCourses] = useState([""]);
  const [sessions, setSessions] = useState([{ days: "", start: "", end: "" }]);

  const [campus, setCampus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [displayBorderRed, setDisplayBorderRed] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  // Function to fetch doctors from the API
  const getDoctors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors");
      if (response.data["message"] === "success") {
        setDoctors(response.data["doctors"]);
      }
    } catch (exception) {}
  };

  // Function to handle checkbox change for campus selection
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setCampus(value);
  };

  // Effect to validate the name input field
  useEffect(() => {
    setValidName(NAMEREGEX.test(name));
  }, [name]);

  // Effect to validate the title input field
  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  // Effect to reset the error message
  useEffect(() => {
    setErrMsg("");
  }, [name, title]);

  // Function to close the popup
  const handleClose = () => {
    close();
  };

  // Function to handle display message
  const handleDisplay = () => {
    setDisplayMessage(false);
  };

  // Function to handle invalid input
  const handleInvalidInput = (errorMsg) => {
    setErrMsg(errorMsg);
    setDisplayBorderRed(true);
    setTimeout(() => {
      setDisplayBorderRed(false);
    }, 400);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const lastSession = sessions[sessions.length - 1];

    if (!NAMEREGEX.test(name)) {
      handleInvalidInput("Please enter a valid name");
      return;
    }

    if (!TITLEREGEX.test(title)) {
      handleInvalidInput("Please enter a valid title");
      return;
    }
    if (!campus) {
      handleInvalidInput("Please choose a valid campus");
      return;
    }
    if (tCourses.length === 0) {
      handleInvalidInput("Please select at least one course");
      return;
    }

    if (!lastSession.days || !lastSession.start || !lastSession.end) {
      handleInvalidInput("Please fill all session details");
      return;
    }

    const data = {};
    const doctor = {
      campus,
      name: name,
      title: title,
      courses: tCourses.filter((course) => course !== ""),
    };
    data["doctor"] = doctor;
    data["availabilities"] = sessions;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/doctors",
        data
      );
      if (response.data["message"] === "success") {
        getDoctors();
        setName("");
        setTitle("");
        setTCourses([""]);
        setSessions([{ days: "", start: "", end: "" }]);
        setErrMsg("");
        setDisplayMessage(true);
      }
    } catch (error) {}
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
          <h1 className="add-form-title">Add Doctor </h1>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="add-form-input">
            <label htmlFor="name">
              Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !name ? "hide invalid" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              className="add-input-field"
            />
            <p
              className={nameFocus && !validName ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              please input a valid name, only letters.
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
              className={
                titleFocus && !validTitle ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Title is limited between 10 to 255 character
            </p>
          </div>

          <div className="checkboxes-container">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="campus"
                value="1"
                checked={campus === "1"}
                onChange={handleCheckboxChange}
              />
              Beirut
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                name="campus"
                value="2"
                checked={campus === "2"}
                onChange={handleCheckboxChange}
              />
              Jbeil
            </label>
          </div>

          <div className="add-form-input">
            <label htmlFor="tCourses">Courses:</label>
            <DropListCourses
              elementCourses={tCourses}
              setElementCourses={setTCourses}
              courses={courses}
            />
          </div>
          <label htmlFor=""> Available Sessions</label>
          <AddSession sessions={sessions} setSessions={setSessions} />
          <div className="form-footer-btns">
            <button className="close-btn" onClick={close}>
              Close
            </button>
            <button className="add-form-submit">Add Doctor</button>
          </div>
        </div>
      )}
    </form>
  );
};
export default AddDoctor;
