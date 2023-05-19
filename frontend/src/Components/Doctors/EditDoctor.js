import React, { useState, useEffect } from "react";
import DropListCourses from "../Courses/DropListCourses";
import AddSession from "./Sessions/AddSession";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)+$/; //will be used for both name and lastname
const titleRegex = /^[a-zA-Z0-9\s]{2,50}$/;

const EditDoctor = ({ close, doctors, setDoctors, courses, id }) => {
  const doctor = doctors.find((doctor) => doctor.id === parseInt(id));
  const [name, setName] = useState(doctor.name);
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [lastName, setLastName] = useState(doctor.lastName);
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [title, setTitle] = useState(doctor.title);
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [tCourses, setTCourses] = useState(doctor.courses);
  const [sessions, setSessions] = useState(doctor.sessions);
  console.log(doctor)

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(nameRegex.test(name));
  }, [name]);

  useEffect(() => {
    setValidLastName(nameRegex.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidTitle(titleRegex.test(title));
  }, [title]);

  useEffect(() => {
    setErrMsg("");
  }, [name, lastName, title]);
  const handleClose = () => {
    close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !lastName || !title || tCourses.length === 0) {
      // Do not submit if any field is empty
      return;
    }
    const updatedDoctor = {
      ...doctor,
      name,
      lastName,
      title,
      tCourses,
      sessions,
    };
    setDoctors(
      doctors.map((doc) => (doc.id === doctor.id ? updatedDoctor : doc))
    );
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title"> Edit Doctor</h1>
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
        <label htmlFor="last-name">
          Last Name:
          <FontAwesomeIcon
            icon={faCheck}
            className={validLastName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validLastName || !lastName ? "hide invalid" : "invalid"}
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
          Title:{" "}
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
        ></p>
      </div>
      <div className="add-form-input">
        <label htmlFor="tCourses">Courses:</label>
        <DropListCourses
          elementCourses={[parseInt(tCourses)]}
          setElementCourses={setTCourses}
          courses={courses}
        />
      </div>
      <AddSession sessions={sessions} setSessions={setSessions} />
      <div className="form-footer-btns">
        <button className="close-btn" onClick={close}>
          Close
        </button>
        <button className="add-form-submit">Update Doctor</button>
      </div>
    </form>
  );
};

export default EditDoctor;
