import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ListCourses from "./ListCourses";
// semester: "Fall 2022",
// subject: "Computer Science",
// courseNumber: "CS101",
// section: "001",
// title: "Introduction to Computer Science"
const Courses = ({ courses, setCourses }) => {
  return (
    <section className="list-section">
      <h1>Courses</h1>
      <ListCourses courses={courses} setCourses={setCourses} />
      <Link to="/AddCourse">
        {" "}
        <button className="add-link-btn">Add Course</button>{" "}
      </Link>
    </section>
  );
};

export default Courses;
