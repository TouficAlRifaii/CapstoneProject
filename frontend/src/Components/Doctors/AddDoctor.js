import React, { useState } from "react";
import DropListCourses from "../Courses/DropListCourses";
import AddSession from "./Sessions/AddSession";

const AddDoctor = ({ doctors, setDoctors, courses }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [tCourses, setTCourses] = useState([""]);
  const [sessions, setSessions] = useState([{ days: "", start: "", end: "" }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !lastName || !title || tCourses.length === 0) {
      // Do not submit if any field is empty
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
    setDoctors([...doctors, newDoctor]);
    setName("");
    setLastName("");
    setTitle("");
    setTCourses([""]);
    setSessions([{ days: "", start: "", end: "" }]);
  };

  const handleTCoursesChange = (event) => {
    const selectedCourses = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTCourses(selectedCourses);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title">Add Doctor</h1>
      <div className="add-form-input">
        <label htmlFor="subject">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="subject">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="subject">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="tCourses">Courses:</label>
        <DropListCourses
          elementCourses={tCourses}
          setElementCourses={setTCourses}
          courses={courses}
        />
      </div>
      <AddSession sessions={sessions} setSessions={setSessions} />
      <button className="add-form-submit">Add Course</button>
    </form>
  );
};
export default AddDoctor;
