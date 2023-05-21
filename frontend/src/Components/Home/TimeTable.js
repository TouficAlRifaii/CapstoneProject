import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import React from "react";

//!!!!!!!!!!!!!!!!!
//Not working
const TimeTable = (sections, setSections, courses, campus) => {
  //need campus
  const timeTable = {
    M: [
      {
        id: 1142,
        campus: "Byblos",
        numOfStudents: 21,
        numOfSections: 1,
        course: 43,
        capacity: 40,
        start: "01:02",
        end: "02:03",
      },
      {
        id: 1143,
        campus: "Beirut",
        numOfStudents: 31,
        numOfSections: 1,
        course: 43,
        capacity: 40,
        start: "01:02",
        end: "02:03",
      },
    ],
    MTW: [
      {
        id: 1196,
        campus: "Beirut",
        numOfStudents: 19,
        numOfSections: 1,
        course: 103,
        capacity: 40,
        start: "01:00",
        end: "03:00",
      },
      {
        id: 1197,
        campus: "Byblos",
        numOfStudents: 2,
        numOfSections: 1,
        course: 103,
        capacity: 40,
        start: "01:00",
        end: "03:00",
      },
    ],
  };

  const [newSections, setNewSections] = useState();

  // Define the campus for which you want to add the property

  // Map over each element in sections

  // Example usage:

  // Update the state with the updatedSections array

  return (
    <div>
      <h2>Time Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
            <th>ID</th>
            <th>Campus</th>
            <th>Number of Students</th>
            <th>Number of Sections</th>
            <th>Course</th>
            <th>Capacity</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timeTable).map(([day, entries]) =>
            entries.map((entry) => (
              <tr key={entry.id}>
                <td>{day}</td>
                <td>{entry.id}</td>
                <td>{entry.campus}</td>
                <td>{entry.numOfStudents}</td>
                <td>{entry.numOfSections}</td>
                <td>{entry.course}</td>
                <td>{entry.capacity}</td>
                <td>{entry.start}</td>
                <td>{entry.end}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
