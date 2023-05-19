import ListCourseId from "../Courses/ListCourseId";
import React, { useState, useEffect } from "react";
import Download from "./Download";
import TimeTable from "./TimeTable";
const CourseOffering = ({
  active,
  setActive,
  sections,
  setSections,
  courses,
}) => {
  const [sectionsNumber, setSectionsNumber] = useState();

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = searchResults
    .slice()
    .sort((a, b) => {
      // Sort by campus
      if (a.campus < b.campus) return -1;
      if (a.campus > b.campus) return 1;

      // Sort by numOfStudents if campuses are the same
      if (a.numOfStudents < b.numOfStudents) return 1;
      if (a.numOfStudents > b.numOfStudents) return -1;

      return 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSectionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].numOfSections = parseInt(value, 10);
    setSections(updatedSections);
  };

  useEffect(() => {
    const filteredResults = sections.filter((section) => {
      const course = courses.find((course) => course.id === section.course);
      return (
        section.campus.toLowerCase().includes(search.toLowerCase()) ||
        (course && course.subject.toLowerCase().includes(search.toLowerCase()))
      );
    });

    setSearchResults(filteredResults.reverse());
  }, [sections, courses, search]);

  const handleActive = () => {
    setActive(true);
  };

  return (
    <div>
      {!active && (
        <section className="list-section">
          <button onClick={handleActive}> Cancel Operation </button>
          <h1>Course Offering</h1>
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
            <table className="table sections">
              <thead>
                <tr>
                  <th>
                    <div className="table-data">Campus</div>
                  </th>
                  <th>
                    <div className="table-data">Course</div>
                  </th>
                  <th>
                    <div className="table-data">Number of Students</div>
                  </th>
                  <th>
                    <div className="table-data">Number of Sections</div>
                  </th>
                  <th>
                    <div className="table-data">Capacity</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((section, index) => (
                  <tr key={section.id} className="list-row">
                    <td>
                      <div className="table-data">{section.campus}</div>
                    </td>
                    <ListCourseId course={[section.course]} courses={courses} />

                    <td>
                      <div className="table-data">{section.numOfStudents}</div>
                    </td>

                    <td>
                      <div className="table-data">
                        <input
                          type="number"
                          value={
                            section.numOfSections === 0
                              ? ""
                              : section.numOfSections
                          }
                          onChange={(e) => {
                            const inputNum = parseInt(e.target.value);
                            const numOfSections = isNaN(inputNum)
                              ? 0
                              : inputNum;
                            if (numOfSections >= 0 && numOfSections <= 9) {
                              const updatedSections = [...sections];
                              const sectionIndex = updatedSections.findIndex(
                                (item) => item.id === section.id
                              );
                              updatedSections[sectionIndex].numOfSections =
                                numOfSections;
                              setSections(updatedSections);
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="table-data">
                        <input
                          type="number"
                          value={section.capacity === 0 ? "" : section.capacity}
                          onChange={(e) => {
                            const inputNum = parseInt(e.target.value);
                            const capacity = isNaN(inputNum) ? 0 : inputNum;
                            if (capacity >= 0 && capacity <= 60) {
                              const updatedSections = [...sections];
                              const sectionIndex = updatedSections.findIndex(
                                (item) => item.id === section.id
                              );
                              updatedSections[sectionIndex].capacity = capacity;
                              setSections(updatedSections);
                            }
                          }}
                        />
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
                  className={`page-btn ${
                    currentPage === number ? "active" : null
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <Download elements={sections} courses={courses} />
          <TimeTable campus="Byblos" />{" "}
        </section>
      )}
    </div>
  );
};

export default CourseOffering;
