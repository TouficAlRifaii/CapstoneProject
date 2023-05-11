import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListCourseId from "../Courses/ListCourseId";
import ListDoctorSession from "./Sessions/ListDoctorSession";
const Doctors = ({ doctors, setDoctors, courses }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage, setDoctorsPerPage] = useState(8);

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
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search for doctors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Courses</th>
            <th>Available Sessions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.id} className="list-row">
              <td>
                {doctor.name} {doctor.lastName}
              </td>
              <td>{doctor.title}</td>
              <ListCourseId course={doctor.tCourses} courses={courses} />
              <ListDoctorSession doctor={doctor} />
              <td>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
                <Link to={`/editDoctor/${doctor.id}`}>
                  <button className="edit-btn"> Edit </button>
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
      <Link to="/addDoctor" className="add-user-link">
        <button className="add-link-btn">Add Doctor</button>
      </Link>
    </section>
  );
};

export default Doctors;
