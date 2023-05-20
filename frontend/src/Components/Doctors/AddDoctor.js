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

const AddDoctor = ({ doctors, setDoctors, courses, close }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [tCourses, setTCourses] = useState([""]);
  const [sessions, setSessions] = useState([{ days: "", start: "", end: "" }]);

  const [errMsg, setErrMsg] = useState("");
  const [displayBorderRed, setDisplayBorderRed] = useState(false); //change borders to red
  const [displayMessage, setDisplayMessage] = useState(false); //after submitting (return or another input)
  const getDoctors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors");
      if (response.data["message"] === "success") {
        setDoctors(response.data["doctors"]);
      }
    } catch (exception) {}
  };

  useEffect(() => {
    setValidName(NAMEREGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  useEffect(() => {
    setErrMsg("");
  }, [name, , title]);

  const handleClose = () => {
    close();
  };

  const handleDisplay = () => {
    setDisplayMessage(false);
  };

  const handleInvalidInput = (errorMsg) => {
    setErrMsg(errorMsg);
    setDisplayBorderRed(true);
    setTimeout(() => {
      setDisplayBorderRed(false);
    }, 400);
  };

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

    if (tCourses.length === 0) {
      handleInvalidInput("Please select at least one course");
      return;
    }

    if (!lastSession.days || !lastSession.start || !lastSession.end) {
      handleInvalidInput("Please fill all session details");
      return;
    }
    const newDoctor = {
      name,
      title,
      tCourses,
      sessions,
    };
    const data = {};
    const doctor = {
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
        setDoctors([...doctors, newDoctor]);
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
