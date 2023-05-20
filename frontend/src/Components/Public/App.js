import About from "../About";
import Courses from "../Courses/Courses";
import Home from "../Home/Home";
import Nav from "./Nav";
import Majors from "../Majors/Majors";
import Missing from "./Missing";
import axios from "axios";

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
import Footer from "./Footer";

function App() {
  //coreq - preReq ids

  const [courses, setCourses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [majors, setMajors] = useState([]);

  const getCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      if (response.data["message"] === "success") {
        setCourses(response.data["courses"]);
      }
    } catch (exception) {}
  };

  useEffect(() => {
    getCourses();
  }, []);
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
            element={
              <Courses
                courses={courses}
                setCourses={setCourses}
                getCourses={getCourses}
              />
            }
          />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </body>
      <Footer />
    </div>
  );
}

export default App;
