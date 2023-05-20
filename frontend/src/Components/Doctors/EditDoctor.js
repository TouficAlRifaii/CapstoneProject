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
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)+$/; //will be used for both name and lastname
const titleRegex = /^[a-zA-Z0-9\s]{2,50}$/;

const EditDoctor = ({ close, doctors, setDoctors, courses, id }) => {
  const doctor = doctors.find((doctor) => doctor.id === parseInt(id));
  const [idDr, setIdDr] = useState(doctor.id);
  const [name, setName] = useState(doctor.name);
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [title, setTitle] = useState(doctor.title);
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [tCourses, setTCourses] = useState(doctor.courses);
  const [sessions, setSessions] = useState(doctor.sessions);

  const [campus, setCampus] = useState(String(doctor.campus));

  const [errMsg, setErrMsg] = useState("");
  const [displayBorderRed, setDisplayBorderRed] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const getDoctors = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/doctors/update"
      );
      if (response.data["message"] === "success") {
        setDoctors(response.data["doctors"]);
      }
    } catch (exception) {}
  };

  useEffect(() => {
    setValidName(nameRegex.test(name));
  }, [name]);

  useEffect(() => {
    setValidTitle(titleRegex.test(title));
  }, [title]);

  useEffect(() => {
    setErrMsg("");
  }, [name, title]);
  const handleClose = () => {
    close();
  };
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setCampus(value);
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

    const data = {};
    const doctor = {
      id: idDr,
      name: name,
      campus: parseInt(campus),
      title: title,
      courses: tCourses.filter((course) => course !== ""),
    };
    data["doctor"] = doctor;
    data["availabilities"] = sessions;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/doctors/update",
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
        handleClose();
      }
    } catch (error) {
      getDoctors();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`add-form ${displayBorderRed ? "empty-fields" : ""}`}
    >
      <div>
        <h1 className="add-form-title">Edit Doctor </h1>
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
          <p className={nameFocus && !validName ? "instructions" : "offscreen"}>
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
            className={titleFocus && !validTitle ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Title is limited between 3 to 255 character
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
          <button className="add-form-submit">Update Doctor</button>
        </div>
      </div>
    </form>
  );
};

export default EditDoctor;
