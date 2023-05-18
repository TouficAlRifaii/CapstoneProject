import AddMajor from "./AddMajor";
import EditMajor from "./EditMajor";
import React, { useState, useEffect } from "react";
import ListCourseId from "../Courses/ListCourseId";
import Popup from "reactjs-popup";

const Majors = ({ courses, majors, setMajors }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [majorsPerPage, setMajorsPerPage] = useState(8);

  useEffect(() => {
    const filteredResults = majors.filter(
      (major) =>
        major.majorTitle.toLowerCase().includes(search.toLowerCase()) ||
        major.courses.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [majors, search]);

  const handleDelete = (id) => {
    const majorsList = majors.filter((major) => major.id !== id);
    setMajors(majorsList);
  };

  const indexOfLastMajor = currentPage * majorsPerPage;
  const indexOfFirstMajor = indexOfLastMajor - majorsPerPage;
  const currentMajors = searchResults.slice(
    indexOfFirstMajor,
    indexOfLastMajor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / majorsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="list-section">
      <h1>Majors</h1>
      <div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for majors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="list-table">
          <thead>
            <tr>
              <th>
                <div className="table-data"> Major Title</div>{" "}
              </th>
              <th>
                <div className="table-data"> Major Credits</div>{" "}
              </th>
              <th>
                <div className="table-data"> Courses</div>
              </th>
              <th>
                <div> </div>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMajors.map((major) => (
              <tr key={major.id} className="list-row">
                <td>
                  {" "}
                  <div className="table-data"> {major.majorTitle} </div>{" "}
                </td>
                <td>
                  <div className="table-data">{major.majorCredits}</div>
                </td>
                <ListCourseId course={major.majorCourses} courses={courses} />
                <td>
                  <div className="table-btns">
                    <button
                      onClick={() => handleDelete(major.id)}
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
                          <EditMajor
                            majors={majors}
                            setMajors={setMajors}
                            courses={courses}
                            id={major.id}
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
        {/* modal: A boolean value that determines whether the popup is a modal (blocks interaction with the rest of the page) or not. */}
        <Popup
          trigger={<button className="add-link-btn">Add major</button>}
          modal
          lockScroll={true}
        >
          {(close) => (
            <div className="popup">
              <AddMajor
                majors={majors}
                setMajors={setMajors}
                courses={courses}
                close={close}
              />
            </div>
          )}
        </Popup>
      </div>
    </section>
  );
};

export default Majors;
