import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListCourses = ({ courses, setCourses }) => {
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
              <td>{course.preReq.join(" - ")}</td>
              <td>{course.coReq.join(" - ")}</td>
              <td>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
                <Link to={`/editcourse/${course.id}`}>
                  <button className="edit-btn">Edit user</button>
                </Link>
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
    </div>
  );
};

export default ListCourses;
