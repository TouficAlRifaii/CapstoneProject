import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListCourseId from "../Courses/ListCourseId";
import ListDoctorSession from "./Sessions/ListDoctorSession";
import Popup from "reactjs-popup";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import axios from "axios";

const Doctors = ({ courses }) => {
  //getting doctors from database
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors");
      if (response.data["message"] === "success") {
        setDoctors(response.data["doctors"]);
      }
    } catch (exception) {}
  };
  useEffect(() => {
    getDoctors();
  }, []);

  // search + paginate
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const filteredResults = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [doctors, search]);

  // delete
  const handleDeleteDoctor = async (doctorId) => {
    const data = new FormData();
    data.append("id", doctorId);

    const url = "http://127.0.0.1:8000/api/doctors/delete";

    try {
      const response = await axios.post(url, data);

      if (response.data["message"] === "success") {
        const doctorsList = doctors.filter((doctor) => doctor.id !== doctorId);
        setDoctors(doctorsList);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <section className="list-section">
      <h1>Doctors</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search for doctors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="table doctors">
          <thead>
            <tr>
              <th>
                <div className="table-data-center">Name </div>
              </th>
              <th>
                <div className="table-data-center">Title </div>
              </th>
              <th>
                <div className="table-data-center">Teaching Courses </div>
              </th>
              <th>
                <div className="table-data-center">Available Sessions</div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((doctor) => (
              <tr key={doctor.id} className="list-row">
                <td>
                  <div className="table-data-name">{doctor.name}</div>
                </td>
                <td>
                  <div className="table-data-name">{doctor.title} </div>
                </td>
                <ListCourseId course={[doctor.courses]} courses={courses} />
                <ListDoctorSession doctor={doctor} />
                <td>
                  <div className="table-btns">
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
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
                          <EditDoctor
                            doctors={doctors}
                            setDoctors={setDoctors}
                            courses={courses}
                            id={doctor.id}
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
          trigger={<button className="add-link-btn">Add doctor</button>}
          modal
          nested
          lockScroll={true}
        >
          {(close) => (
            <div className="popup">
              <AddDoctor
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
                close={close}
              />{" "}
            </div>
          )}
        </Popup>
      </div>
    </section>
  );
};

export default Doctors;
