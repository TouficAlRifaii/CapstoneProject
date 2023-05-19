import About from "../About";
import Courses from "../Courses/Courses";
import Home from "../Home/Home";
import Nav from "./Nav";
import Majors from "../Majors/Majors";
import Missing from "./Missing";
import axios from "axios"

import Doctors from "../Doctors/Doctors";
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AddUser from "../Users/AddUser";
import AddCourse from "../Courses/AddCourse";
import Login from "./Login";

import "../../CSS/Tables.css";
import "../../CSS/Forms.css";
import "../../CSS/Nav.css";
import "../../CSS/DropList.css";

function App() {
  //coreq - preReq ids
  const [users, setUsers] = useState([
    {
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      authorizationLevel: "admin",
    },
    {
      name: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      authorizationLevel: "admin",
    },
    {
      name: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      authorizationLevel: "admin",
    },
    {
      name: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Tom",
      lastName: "Wilson",
      email: "tom.wilson@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Emily",
      lastName: "Brown",
      email: "emily.brown@example.com",
      authorizationLevel: "user",
    },
    {
      name: "David",
      lastName: "Lee",
      email: "david.lee@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Jessica",
      lastName: "Chen",
      email: "jessica.chen@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Matt",
      lastName: "Nguyen",
      email: "matt.nguyen@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Olivia",
      lastName: "Garcia",
      email: "olivia.garcia@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Kevin",
      lastName: "Wang",
      email: "kevin.wang@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Maria",
      lastName: "Martinez",
      email: "maria.martinez@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Ryan",
      lastName: "Lopez",
      email: "ryan.lopez@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Melissa",
      lastName: "Jones",
      email: "melissa.jones@example.com",
      authorizationLevel: "user",
    },
    {
      name: "Justin",
      lastName: "Gonzalez",
      email: "justin.gonzalez@example.com",
      authorizationLevel: "user",
    },
  ]);
  const [courses, setCourses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const getCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      if (response.data["message"] === "success") {
        // console.log(response.data);
        setCourses(response.data["courses"]);
      }
    } catch (exception) {
      console.log(exception);
    }
  };
  //   {
  //     id: 1,
  //     name: "John",
  //     lastName: "Doe",
  //     tCourses: ["1", "2"],
  //     title: "Pediatrician",
  //     sessions: [{ days: "MRF", start: "9:00", end: "11:00" }],
  //   },
  //   {
  //     id: 2,
  //     name: "Jane",
  //     lastName: "Smith",
  //     tCourses: ["2", "4"],
  //     title: "Dentist",
  //     sessions: [
  //       { days: "M", start: "11:00", end: "13:00" },
  //       { days: "W", start: "12:00", end: "14:00" },
  //       { days: "F", start: "11:00", end: "13:00" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "David",
  //     lastName: "Lee",
  //     tCourses: ["3"],
  //     title: "Psychologist",
  //     sessions: [
  //       { days: "T", start: "13:00", end: "15:00" },
  //       { days: "R", start: "14:00", end: "16:00" },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Mary",
  //     lastName: "Johnson",
  //     tCourses: ["1", "4"],
  //     title: "Family Doctor",
  //     sessions: [
  //       { days: "M", start: "8:00", end: "10:00" },
  //       { days: "W", start: "10:00", end: "12:00" },
  //       { days: "F", start: "8:00", end: "10:00" },
  //     ],
  //   },
  // ]);
  const getDoctors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/doctors");
      if (response.data["message"] === "success") {
        console.log(response.data);
        setDoctors(response.data["doctors"]);
      }
    } catch (exception) {
      console.log("test");
    }
  };
  useEffect(() => {
    getCourses();
    getDoctors();
    console.log(courses);
  }, []);
  const [majors, setMajors] = useState([
    {
      id: "0",
      majorTitle: "Computer science",
      majorCredits: "89",
      majorCourses: ["2", "4", "5", "6", "8"],
    },
    {
      id: "1",
      majorTitle: "Literature",
      majorCredits: "89",
      majorCourses: ["2", "4", "5", "6", "8"],
    },
    {
      id: "2",
      majorTitle: "Literature",
      majorCredits: "89",
      majorCourses: ["13", "3", "7", "6", "8"],
    },
  ]);
  console.log(courses)
  return (
    <div className="App">
      <Nav />
      <body>
        <Routes>
          <Route exact path="/" element={<Home courses={courses} />} />
          <Route
            exact
            path="doctors"
            element={
              <Doctors
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
              />
            }
          />
          <Route
            exact
            path="doctors"
            element={
              <Doctors
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
              />
            }
          />
          <Route
            exact
            path="doctors"
            element={
              <Doctors
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
              />
            }
          />
          <Route
            exact
            path="majors"
            element={
              <Majors majors={majors} setMajors={setMajors} courses={courses} />
            }
          />
          <Route
            exact
            path="courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </body>
    </div>
  );
}

export default App;
