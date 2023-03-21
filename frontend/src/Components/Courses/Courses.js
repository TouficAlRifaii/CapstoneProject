import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react' ;
import ListCourses from "./ListCourses";
// semester: "Fall 2022",
// subject: "Computer Science",
// courseNumber: "CS101",
// section: "001",
// title: "Introduction to Computer Science"
const Courses = ({ courses, setCourses }) => {

  return (
    <div>

      <h1>Courses</h1>
      <ListCourses courses={courses} setCourses={setCourses}/>
      <Link to="/AddCourse"> <button>Add Course</button> </Link>
    </div>
  );
}

export default Courses;