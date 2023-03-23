import About from '../About';
import Courses from '../Courses/Courses';
import Home from '../Home/Home';
import Nav from './Nav';
import Users from '../Users/Users'; 
import Header from './Header';
import Footer from './Footer';
import Missing from './Missing';
import EditUser from '../Users/EditUser';
import EditCourse from '../Courses/EditCourse';
import {Route, Routes, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect} from 'react' ;
import AddUser from '../Users/AddUser';
import AddCourse from '../Courses/AddCourse';

function App() {
  const [users, setUsers] = useState([
    {
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      authorizationLevel: "admin"
    },
    {
      name: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      authorizationLevel: "admin"
    },
    {
      name: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      authorizationLevel: "admin"
    }
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
      coReq: ["MATH101"]
    },
    {
      id: 2,
      subject: "ENG",
      courseNumber: "202",
      section: "002",
      title: "Shakespearean Tragedies",
      creditsNbr: 3,
      preReq: ["ENG101", "MTH23"],
      coReq: []
    },
    {
      id: 3,
      subject: "MTH",
      courseNumber: "301",
      section: "003",
      title: "Calculus III",
      creditsNbr: 4,
      preReq: ["MATH201", "MATH202"],
      coReq: ["PHYS101", "PHYS102"]
    }
  ]);
  
  
  
  return (
    <div className="App">
      <Nav/>
      <Routes>
          <Route exact path='/' element={<Home /> } />

          <Route exact path="courses" element={<Courses courses={courses} setCourses={setCourses}/>} />
          <Route exact path="addcourse" element={<AddCourse courses={courses} setCourses={setCourses}/>} />
          <Route exact path="/editcourse/:id" element={<EditCourse courses={courses} setCourses={setCourses}/>} />

          <Route exact path="users" element={<Users users={users} setUsers={setUsers}/>} />
          <Route exact path="adduser" element={<AddUser users={users} setUsers={setUsers}/>} />
          <Route path="/edituser/:name" element={<EditUser users={users} setUsers={setUsers}/>} />

         
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
