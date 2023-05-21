import AddMajor from "./AddMajor";
import EditMajor from "./EditMajor";
import React, { useState, useEffect } from "react";
import ListCourseId from "../Courses/ListCourseId";
import Popup from "reactjs-popup";
import axios from "axios";

const Majors = ({ courses, majors, setMajors }) => {
  // search + paginate
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create an array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Fetch the list of majors from the server
  const getMajors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/major");
      if (response.data["message"] === "success") {
        setMajors(response.data["majors"]);
      }
    } catch (exception) {
      // Handle exception if needed
    }
  };

  // Fetch the list of majors when the component mounts
  useEffect(() => {
    getMajors();
  }, []);

  // Update the search results when majors or search term change
  useEffect(() => {
    const filteredResults = majors.filter((major) =>
      major.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
    setCurrentPage(1);
  }, [majors, search]);

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

        <table className="table majors">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((major) => (
              <tr key={major.id} className="list-row">
                <td>
                  <div className="table-data"> {major.title} </div>
                </td>
                <td>
                  <div className="table-data-center">{major.credits}</div>
                </td>
                <ListCourseId course={major.courses} courses={courses} />
                <td>
                  <div className="table-btns">
                    {/* <button
                      onClick={() => handleDeleteMajor(major.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button> */}
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
