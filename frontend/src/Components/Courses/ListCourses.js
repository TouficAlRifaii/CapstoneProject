import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react' ;

const ListCourses = ({courses, setCourses}) =>{
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
    return(
        <div>
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
          <th>Subject</th>
          <th>Course Number</th>
          <th>Title</th>
          <th>Credits</th>
          <th>Prerequisites</th>
          <th>Corequisites</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {searchResults.map((course) => (
        <tr key={course}>
          <td>{course.subject}</td>
          <td>{course.courseNumber}</td>
          <td>{course.title}</td>
          <td>{course.creditsNbr}</td>
          <td>
          {/* {course.preReq.map((element) => (
            <tr key={element}>{element}</tr>
          ))} */}
          <td>{course.preReq}</td>
          </td>
          <td>
          {/* {course.coReq.map((element) => (
            <tr key={element}>{element}</tr>
          ))} */}
          <td>{course.coReq}</td>
          {console.log(course.preReq)}
          </td>
          <td><button onClick={() => handleDeleteCourse(course.courseNumber)}>Delete</button>
          <button>Edit</button></td>
        </tr>
        ))}

        </tbody>
      </table>
      </div>
    );
}

export default ListCourses;