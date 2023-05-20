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

const NAMEREGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)+$/; //will be used for both name and lastname
const TITLEREGEX = /^[a-zA-Z0-9\s]{2,50}$/;

const AddDoctor = ({ doctors, setDoctors, courses, close }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [tCourses, setTCourses] = useState([]);
  const [sessions, setSessions] = useState([{ days: "", start: "", end: "" }]);

  const [errMsg, setErrMsg] = useState("");
  const [displayBorderRed, setDisplayBorderRed] = useState(false); //change borders to red
  const [displayMessage, setDisplayMessage] = useState(false); //after submitting (return or another input)

  useEffect(() => {
    setValidName(NAMEREGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidLastName(NAMEREGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  useEffect(() => {
    setErrMsg("");
  }, [name, lastName, title]);

  const handleClose = () => {
    close();
  };

  const handleDisplay = () => {
    setDisplayMessage(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const lastSession = sessions[sessions.length - 1];

    if (
      !NAMEREGEX.test(name) ||
      !NAMEREGEX.test(lastName) ||
      !TITLEREGEX.test(title) ||
      tCourses.length === 0 ||
      !lastSession.days ||
      !lastSession.start ||
      !lastSession.end
    ) {
      setErrMsg("Please fill all the fields");
      setDisplayBorderRed(true);

      setTimeout(() => {
        setDisplayBorderRed(false);
      }, 400);
      return;
    }
    const newDoctor = {
      id: doctors.length + 1,
      name,
      lastName,
      title,
      tCourses,
      sessions,
    };
    const data = {};
    const doctor = {
      name: name + lastName,
      title: title,
      courses: tCourses.filter((course) => course !== ""),
    };
    data["doctor"] = doctor;
    data["availabilties"] = sessions;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/doctors",
        data
      );
      if (response.data["message"] === "success") {
        setDoctors([...doctors, newDoctor]);
        setName("");
        setLastName("");
        setTitle("");
        setTCourses([""]);
        setSessions([{ day: "", start: "", end: "" }]);
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
            <label htmlFor="subject">
              Last Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validLastName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validLastName || !lastName ? "hide invalid" : "invalid"
                }
              />
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              className="add-input-field"
            />
            <p
              className={
                lastNameFocus && !validLastName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              please input a valid last name, onlye letters
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
