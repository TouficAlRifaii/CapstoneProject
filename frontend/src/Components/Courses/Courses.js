import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ListCourses from "./ListCourses";
import ListCourseId from "./ListCourseId";
import Popup from "reactjs-popup";

import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
// semester: "Fall 2022",
// subject: "Computer Science",
// courseNumber: "CS101",
// section: "001",
// title: "Introduction to Computer Science"
const Courses = ({ courses, setCourses }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const filteredResults = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.subject.toLowerCase().includes(search.toLowerCase()) ||
        course.courseNumber.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
    setCurrentPage(1);
  }, [courses, search]);

  const handleDeleteCourse = (courseId) => {
    const coursesList = courses.filter((course) => course.id !== courseId);
    setCourses(coursesList);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="list-section">
      <h1>Courses</h1>
      <div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <table className="list-table courses">
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
            {currentItems.map((course) => (
              <tr key={course} className="list-row">
                <td>{course.subject}</td>
                <td>{course.courseNumber}</td>
                <td>{course.title}</td>
                <td>{course.creditsNbr}</td>
                <ListCourseId course={course.preReq} courses={courses} />{" "}
                <ListCourseId course={course.coReq} courses={courses} />{" "}
                <td>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <Popup
                    trigger={<button className="edit-btn">Edt</button>}
                    modal
                    lockScroll={true}
                  >
                    {(close) => (
                      <div className="popup">
                        <EditCourse
                          courses={courses}
                          setCourses={setCourses}
                          id={course.id}
                          close={close}
                        />
                      </div>
                    )}
                  </Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`page-btn ${currentPage === number ? "active" : null}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <Popup
          trigger={<button className="add-link-btn">Add Course</button>}
          modal
          lockScroll={true}
        >
          {(close) => (
            <div className="popup">
              <AddCourse
                courses={courses}
                setCourses={setCourses}
                close={close}
              />
            </div>
          )}
        </Popup>
      </div>
    </section>
  );
};

export default Courses;
