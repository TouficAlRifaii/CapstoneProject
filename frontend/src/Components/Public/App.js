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
      section: "001",
      title: "Introduction to Computer Science",
      creditsNbr: 4,
      preReq: [],
      coReq: ["MATH101"],
    },
    {
      id: 2,
      subject: "ENG",
      courseNumber: "202",
      section: "002",
      title: "Shakespearean Tragedies",
      creditsNbr: 3,
      preReq: ["ENG101", "MTH23"],
      coReq: [],
    },
    {
      id: 3,
      subject: "MTH",
      courseNumber: "301",
      section: "003",
      title: "Calculus III",
      creditsNbr: 4,
      preReq: ["MATH201", "MATH202"],
      coReq: ["PHYS101", "PHYS102"],
    },
    {
      id: 4,
      subject: "BIO",
      courseNumber: "101",
      section: "001",
      title: "Introduction to Biology",
      creditsNbr: 4,
      preReq: [],
      coReq: ["CHEM101"],
    },
    {
      id: 5,
      subject: "CHEM",
      courseNumber: "101",
      section: "001",
      title: "General Chemistry I",
      creditsNbr: 4,
      preReq: [],
      coReq: ["MATH101"],
    },
    {
      id: 6,
      subject: "PHY",
      courseNumber: "101",
      section: "001",
      title: "General Physics I",
      creditsNbr: 4,
      preReq: ["MATH101"],
      coReq: [],
    },
    {
      id: 7,
      subject: "PSY",
      courseNumber: "101",
      section: "001",
      title: "Introduction to Psychology",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
    {
      id: 8,
      subject: "ART",
      courseNumber: "101",
      section: "001",
      title: "Introduction to Art",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
    {
      id: 9,
      subject: "BUS",
      courseNumber: "101",
      section: "001",
      title: "Introduction to Business",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
    {
      id: 10,
      subject: "ECO",
      courseNumber: "101",
      section: "001",
      title: "Principles of Microeconomics",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
    {
      id: 11,
      subject: "HIS",
      courseNumber: "101",
      section: "001",
      title: "Western Civilization I",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
    {
      id: 12,
      subject: "LIT",
      courseNumber: "101",
      section: "001",
      title: "Introduction to Literature",
      creditsNbr: 3,
      preReq: [],
      coReq: [],
    },
  ]);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Sara",
      lastName: "Sara",
      tCourses: ["1", "3"],
      title: "English Professor",
      sessions: [
        { days: "MWF", start: "10:00", end: "10:50" },
        { days: "TR", start: "13:00", end: "13:50" },
        { days: "MWF", start: "10:00", end: "11:50" },
        { days: "TR", start: "13:00", end: "17:50" },
      ],
    },
    {
      id: 2,
      name: "Ahmed",
      lastName: "Ersel",
      tCourses: ["5", "6"],
      title: "Biology Professor",
      sessions: [
        { days: "MWF", start: "11:00", end: "11:50" },
        { days: "TR", start: "14:00", end: "14:50" },
      ],
    },
    {
      id: 3,
      name: "Fatima",
      lastName: "Al cheikh",
      tCourses: ["7", "12"],
      title: "Philosophy Professor",
      sessions: [
        { days: "MWF", start: "13:00", end: "13:50" },
        { days: "TR", start: "09:00", end: "09:50" },
      ],
    },
  ]);

  return (
    <div className="App">
      <Nav />
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
    </div>
  );
}

export default App;
