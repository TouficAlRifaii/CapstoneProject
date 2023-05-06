import React, { useState } from "react";
import DropListCourses from "../Courses/DropListCourses";
import AddSession from "./AddSession";

const AddDoctor = ({ doctors, setDoctors, courses }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [tCourses, setTCourses] = useState([""]);
  const [sessions, setSessions] = useState([{ days: "", start: "", end: "" }]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <section className="form-section">
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
        <button className="add-link-btn">Add Course</button>
      </form>
    </section>
  );
};
export default AddDoctor;
