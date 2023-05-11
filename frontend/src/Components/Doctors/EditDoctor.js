import React, { useState } from "react";
import DropListCourses from "../Courses/DropListCourses";
import AddSession from "./Sessions/AddSession";
import { useParams, useNavigate } from "react-router-dom";

const EditDoctor = ({ doctors, setDoctors, courses }) => {
  const { id } = useParams();
  const doctor = doctors.find((doctor) => doctor.id === parseInt(id));

  const [name, setName] = useState(doctor.name);
  const [lastName, setLastName] = useState(doctor.lastName);
  const [title, setTitle] = useState(doctor.title);
  const [tCourses, setTCourses] = useState(doctor.tCourses);
  const [sessions, setSessions] = useState(doctor.sessions);

  const navigate = useNavigate();

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
    navigate("/doctors");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title"> Edit Doctor</h1>
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
        <label htmlFor="title">Title:</label>
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
      <button className="add-form-submit">Update Doctor</button>
    </form>
  );
};

export default EditDoctor;
