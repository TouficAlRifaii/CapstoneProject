import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react' ;

// semester: "Fall 2022",
// subject: "Computer Science",
// courseNumber: "CS101",
// section: "001",
// title: "Introduction to Computer Science"
const Courses = ({ courses, setCourses }) => {


    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
      const filteredResults = courses.filter((course) =>
        ((course.title).toLowerCase()).includes(search.toLowerCase())
        || ((course.subject).toLowerCase()).includes(search.toLowerCase())
        || ((course.courseNumber).toLowerCase()).includes(search.toLowerCase()));

  
      setSearchResults(filteredResults.reverse());
    }, [courses, search])

  const handleDeleteCourse = (courseNumber) => {
    const coursesList = courses.filter(course => course.courseNumber !== courseNumber);
    setCourses(coursesList);
  }

  return (
    <div>
      <h1>Courses</h1>

      <div className="nav-search">
          <input 
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

      <table className="table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Subject</th>
            <th>Course Number</th>
            <th>Section</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((course) => (
            <tr key={course}>
              <td>{course.semester}</td>
              <td>{course.subject}</td>
              <td>{course.courseNumber}</td>
              <td>{course.section}</td>
              <td>{course.title}</td>
              <td>  <button onClick={() => handleDeleteCourse(course.courseNumber)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/AddCourse"> <button>Add Course</button> </Link>
    </div>
  );
}

export default Courses;