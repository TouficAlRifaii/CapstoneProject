import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ListCourseId from "./ListCourseId";
import Popup from "reactjs-popup";
import axios from "axios";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";

const Courses = ({ courses, setCourses, getCourses }) => {
  // courses API is called in app because it's used in multiple pages

  // search + paginate
  const [searchResults, setSearchResults] = useState([]); // Stores the filtered search results
  const [search, setSearch] = useState(""); // Stores the search query
  const [currentPage, setCurrentPage] = useState(1); // Stores the current page number
  const [itemsPerPage, setItemsPerPage] = useState(9); // Stores the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage; // Calculates the index of the last item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Calculates the index of the first item on the current page
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem); // Retrieves the items to display on the current page

  // paginate (pageNumber: number)
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Sets the current page number for pagination

  const pageNumbers = []; // Stores the available page numbers for pagination
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    // Filter search results based on courses and search query
    const filteredResults = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.subject.toLowerCase().includes(search.toLowerCase()) ||
        course.courseNumber.toLowerCase().includes(search.toLowerCase())
    );
    setCurrentPage(1); // Reset the current page to the first page
    setSearchResults(filteredResults); // Update the filtered search results
  }, [courses, search]);

  // handleDeleteCourse (courseId: string)
  const handleDeleteCourse = async (courseId) => {
    // Sends a DELETE request to delete a course with the specified ID
    const data = new FormData();
    data.append("id", courseId);
    const url = "http://127.0.0.1:8000/api/courses/delete";
    try {
      const response = await axios.post(url, data);

      if (response.data["message"] === "success") {
        // Update the courses list after successful deletion
        const coursesList = courses.filter((course) => course.id !== courseId);
        setCourses(coursesList);
      }
    } catch (error) {}
  };

  return (
    <section className="list-section">
      <h1>Courses</h1>
      <div> </div>
      <div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <table className="table courses">
          <thead>
            <tr>
              <th>
                <div className="table-data-center">Subject</div>
              </th>
              <th>
                <div className="table-data-center">Number</div>
              </th>
              <th>
                <div className="table-data-center">Title</div>
              </th>
              <th>
                <div className="table-data-center">Credits</div>
              </th>
              <th>
                <div className="table-data-center">Pre-requisites</div>
              </th>

              <th>
                <div className="table-data-center">Co-requisites</div>
              </th>
              <th>
                <div className="table-data-center">Substitute</div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((course) => (
              <tr key={course.id} className="list-row">
                <td>
                  <div className="table-data-center">{course.subject}</div>
                </td>
                <td>
                  <div className="table-data-center">{course.courseNumber}</div>
                </td>
                <td>
                  <div className="table-data-name">{course.title}</div>
                </td>
                <td>
                  <div className="table-data-center">
                    {course.creditsNumber}
                  </div>
                </td>
                <ListCourseId course={course.preReq} courses={courses} />{" "}
                <ListCourseId course={course.coReq} courses={courses} />{" "}
                <ListCourseId course={[course.substitutes]} courses={courses} />
                <td>
                  <div className="table-btns">
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <Popup
                      trigger={<button className="edit-btn">Edit</button>}
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
                  </div>
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
