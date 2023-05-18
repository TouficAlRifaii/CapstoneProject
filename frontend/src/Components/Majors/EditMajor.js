import React, { useState, useEffect } from "react";
import DropListCourses from "../Courses/DropListCourses";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TITLEREGEX = /^.{4,255}$/;
const CREDITSNUMBERREGEX = /^[1-9][0-9]?$|^100$/;

const EditMajor = ({ majors, setMajors, id, close, courses }) => {
  const major = majors.find((m) => m.id === id);
  console.log(majors, major, id);
  const [title, setTitle] = useState(major.majorTitle);
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState(
    major.majorCredits.toString()
  );
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [majorCourses, setMajorCourses] = useState(major.majorCourses);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidTitle(TITLEREGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidCreditsNumber(CREDITSNUMBERREGEX.test(creditsNumber));
  }, [creditsNumber]);

  useEffect(() => {
    setErrMsg("");
  }, [title, creditsNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !TITLEREGEX.test(title) ||
      !CREDITSNUMBERREGEX.test(creditsNumber) ||
      majorCourses.length === 0
    ) {
      setErrMsg("Please fill out all fields.");
      return;
    }

    const editedMajor = {
      ...major,
      majorTitle: title,
      majorCreditsNumber: parseInt(creditsNumber),
      majorCourses,
    };

    const index = majors.findIndex((m) => m.id === editedMajor.id);
    majors[index] = editedMajor;

    setMajors([...majors]);
    close();
  };
  return (
    <form onSubmit={handleSubmit} className="add-form">
      {/* Added so when tge user enters the page it doesnt autofocus the other inputs */}
      <h1 className="add-form-title">Add Major</h1>{" "}
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
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
          Title is limited between 4 to 255 character
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
              validCreditsNumber || !creditsNumber ? "hide invalid" : "invalid"
            }
          />
        </label>
        <input
          type="number"
          id="creditsNumber"
          value={creditsNumber}
          onChange={(event) => setCreditsNumber(event.target.value)}
          onFocus={() => setCreditsNumberFocus(true)}
          onBlur={() => setCreditsNumberFocus(false)}
          className="add-input-field"
        />
        <p
          id="uidnote"
          className={
            creditsNumberFocus && !creditsNumber ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Credits number between 1-100
        </p>
      </div>
      <div className="add-form-input">
        <label htmlFor="majorCourses">Major Courses</label>
        <DropListCourses
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
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMajor;
