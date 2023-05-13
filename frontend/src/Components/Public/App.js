import About from "../About";
import Courses from "../Courses/Courses";
import Home from "../Home/Home";
import Nav from "./Nav";
import Users from "../Users/Users";
import Header from "./Header";
import Footer from "./Footer";
import Missing from "./Missing";
import EditUser from "../Users/EditUser";
import EditCourse from "../Courses/EditCourse";
import Doctors from "../Doctors/Doctors";
import AddDoctor from "../Doctors/AddDoctor";
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
import EditDoctor from "../Doctors/EditDoctor";

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
  const [courses, setCourses] = useState([
    {
      id: 1,
      subject: "CSC",
      courseNumber: "101",
      title: "Introduction to Computer Science",
      creditsNbr: 4,
      preReq: [],
      coReq: ["1", "4"],
    },
    {
      id: 2,
      subject: "CSC",
      courseNumber: "102",
      title: "Programming Fundamentals",
      creditsNbr: 4,
      preReq: ["1"],
      coReq: [],
    },
    {
      id: 3,
      subject: "CSC",
      courseNumber: "201",
      title: "Data Structures and Algorithms",
      creditsNbr: 4,
      preReq: ["2"],
      coReq: ["4"],
    },
    {
      id: 4,
      subject: "MTH",
      courseNumber: "201",
      title: "Discrete Mathematics",
      creditsNbr: 4,
      preReq: [],
      coReq: ["3"],
    },
    {
      id: 5,
      subject: "CSC",
      courseNumber: "301",
      title: "Software Engineering",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 6,
      subject: "CSC",
      courseNumber: "302",
      title: "Database Systems",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 7,
      subject: "CSC",
      courseNumber: "401",
      title: "Computer Networks",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 8,
      subject: "CSC",
      courseNumber: "402",
      title: "Operating Systems",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 9,
      subject: "CSC",
      courseNumber: "501",
      title: "Artificial Intelligence",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 10,
      subject: "CSC",
      courseNumber: "502",
      title: "Machine Learning",
      creditsNbr: 4,
      preReq: ["9"],
      coReq: [],
    },
    {
      id: 11,
      subject: "CSC",
      courseNumber: "601",
      title: "Computer Graphics",
      creditsNbr: 4,
      preReq: ["3"],
      coReq: [],
    },
    {
      id: 12,
      subject: "CSC",
      courseNumber: "602",
      title: "Computer Vision",
      creditsNbr: 4,
      preReq: ["9"],
      coReq: [],
    },
  ]);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      tCourses: ["1", "2"],
      title: "Pediatrician",
      sessions: [{ days: "MRF", start: "9:00", end: "11:00" }],
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      tCourses: ["2", "4"],
      title: "Dentist",
      sessions: [
        { days: "M", start: "11:00", end: "13:00" },
        { days: "W", start: "12:00", end: "14:00" },
        { days: "F", start: "11:00", end: "13:00" },
      ],
    },
    {
      id: 3,
      name: "David",
      lastName: "Lee",
      tCourses: ["3"],
      title: "Psychologist",
      sessions: [
        { days: "T", start: "13:00", end: "15:00" },
        { days: "R", start: "14:00", end: "16:00" },
      ],
    },
    {
      id: 4,
      name: "Mary",
      lastName: "Johnson",
      tCourses: ["1", "4"],
      title: "Family Doctor",
      sessions: [
        { days: "M", start: "8:00", end: "10:00" },
        { days: "W", start: "10:00", end: "12:00" },
        { days: "F", start: "8:00", end: "10:00" },
      ],
    },
  ]);

  return (
    <div className="App">
      <Nav />
      <body>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />

          <Route
            exact
            path="adduser"
            element={<AddUser users={users} setUsers={setUsers} />}
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
            path="AddDoctor"
            element={
              <AddDoctor
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
              />
            }
          />
          <Route
            exact
            path="EditDoctor/:id"
            element={
              <EditDoctor
                doctors={doctors}
                setDoctors={setDoctors}
                courses={courses}
              />
            }
          />

          <Route
            exact
            path="users"
            element={<Users users={users} setUsers={setUsers} />}
          />
          <Route
            exact
            path="courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />
          <Route
            exact
            path="addcourse"
            element={<AddCourse courses={courses} setCourses={setCourses} />}
          />
          <Route
            exact
            path="/editcourse/:id"
            element={<EditCourse courses={courses} setCourses={setCourses} />}
          />

          <Route
            path="/edituser/:name"
            element={<EditUser users={users} setUsers={setUsers} />}
          />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </body>
    </div>
  );
}

export default App;
