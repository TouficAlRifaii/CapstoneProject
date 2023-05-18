import React, { useEffect, useState } from "react";
import DropListCourses from "../Courses/DropListCourses";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TITLEREGEX = /^.{10,255}$/;

const CREDITSNUMBERREGEX = /^[1-5]$/;

const AddMajor = ({ majors, setMajors, courses, close }) => {
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [creditsNumber, setCreditsNumber] = useState("");
  const [validCreditsNumber, setValidCreditsNumber] = useState(false);
  const [creditsNumberFocus, setCreditsNumberFocus] = useState(false);

  const [majorCourses, setMajorCourses] = useState([]);

  const [errMsg, setErrMsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

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
      setEmptyFields(true);

      setTimeout(() => {
        setEmptyFields(false);
      }, 400);

      return;
    }

    const newMajor = {
      id: majors.length + 1,
      majorTitle: title,
      majorCredits: parseInt(creditsNumber),
      majorCourses,
    };
    setMajors([...majors, newMajor]);

    setErrMsg("");
    setTitle("");
    setCreditsNumber("");
    setMajorCourses([]);
    setDisplayMessage(true);
  };
  const handleClose = () => {
    close();
  };

  const handleDisplay = () => {
    setDisplayMessage(false);
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
