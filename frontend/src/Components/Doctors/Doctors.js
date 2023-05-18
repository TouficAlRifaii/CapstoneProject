import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListCourseId from "../Courses/ListCourseId";
import ListDoctorSession from "./Sessions/ListDoctorSession";
import Popup from "reactjs-popup";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";

const Doctors = ({ doctors, setDoctors, courses }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage, setDoctorsPerPage] = useState(3);

  useEffect(() => {
    const filteredResults = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [doctors, search]);

  const handleDelete = (id) => {
    const doctorsList = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(doctorsList);
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = searchResults.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / doctorsPerPage); i++) {
    pageNumbers.push(i);
  }

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
                <div className="table-data">Name </div>
              </th>
              <th>
                <div className="table-data">Title </div>
              </th>
              <th>
                <div className="table-data">Courses </div>
              </th>
              <th>
                <div className="table-data">Available Sessions</div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentDoctors.map((doctor) => (
              <tr key={doctor.id} className="list-row">
                <td>
                  <div className="table-data">
                    {doctor.name} {doctor.lastName}
                  </div>
                </td>
                <td>
                  <div className="table-data">{doctor.title} </div>
                </td>
                <ListCourseId course={doctor.tCourses} courses={courses} />
                <ListDoctorSession doctor={doctor} />
                <td>
                  <div className="table-btns">
                    <button
                      onClick={() => handleDelete(doctor.id)}
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
