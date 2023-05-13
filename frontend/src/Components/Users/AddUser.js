import React, { useState, useEffect } from "react";
import "../../CSS/Forms.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const AddUser = ({ users, setUsers }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [valiedEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [authorizationLevel, setAuthorizationLevel] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]); //user in the array, ever  y time it changes it will check the validation of that field - used to apply CSS

  useEffect(() => {
    setErrMsg("");
  }, [name, lastName, email, authorizationLevel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const v1 = EMAIL_REGEX.test(email);

    if (!v1) {
      setErrMsg("Invalid Entry, check email");
      setEmailFocus(false);
    } else {
      event.preventDefault();
      const newUser = { name, lastName, email, authorizationLevel };
      const allUsers = [...users, newUser];
      setUsers(allUsers);
      setName("");
      setEmail("");
      setLastName("");
      setAuthorizationLevel("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title">Add User</h1>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <div className="add-form-input">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="email">
          Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={valiedEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={valiedEmail || !email ? "hide invalid" : "invalid"}
          />
        </label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          className="add-input-field"
        />
        <p
          id="uidnote"
          className={emailFocus && !valiedEmail ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          please input a valid email
        </p>
      </div>
      <div className="add-form-input">
        <label htmlFor="authorization-level">Authorization Level:</label>
        <input
          type="text"
          id="authorization-level"
          value={authorizationLevel}
          onChange={(event) => setAuthorizationLevel(event.target.value)}
          className="add-input-field"
        />
      </div>
      <button type="submit" className="add-form-submit">
        Add User
      </button>
    </form>
  );
};

export default AddUser;
