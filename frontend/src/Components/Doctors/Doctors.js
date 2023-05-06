import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            <th>LastName</th>
            <th>Title</th>
            <th>Courses</th>
            <th>Sessions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.id} className="list-row">
              <td>{doctor.name}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.title}</td>
              {doctor.tCourses
                .map((courseId) => {
                  const cId = courseId;
                  const course = courses.find(
                    (c) => c.id === parseInt(courseId)
                  );
                  console.log("Course ID:", courseId);
                  console.log("Course Object:", course);
                  return course
                    ? `${course.subject}${course.courseNumber}`
                    : "";
                })
                .join(" - ")}
              <td>
                <div>
                  <h4>MWF</h4>
                  {doctor.sessions
                    .filter((session) => session.days === "MWF")
                    .sort((a, b) => (a.start > b.start ? 1 : -1))
                    .map((session, index) => (
                      <div key={index}>
                        {session.start} - {session.end}
                      </div>
                    ))}
                </div>
                <div>
                  <h4>TR</h4>
                  {doctor.sessions
                    .filter((session) => session.days === "TR")
                    .sort((a, b) => (a.start > b.start ? 1 : -1))
                    .map((session, index) => (
                      <div key={index}>
                        {session.start} - {session.end}
                      </div>
                    ))}
                </div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
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
        <button>Add Doctor</button>
      </Link>
    </section>
  );
};

export default Doctors;
