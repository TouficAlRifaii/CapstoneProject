import React, { useState } from "react";
import DropListCourses from "./DropListCourses";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import DropListSubjects from "./DropListSubjects";

const AddCourse = ({ courses, setCourses }) => {
  const [subject, setSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [creditsNbr, setCreditsNbr] = useState("");

  const [preReq1, setPreReq1] = useState("");
  const [preReq2, setPreReq2] = useState("");

  const [coReq1, setCoReq1] = useState("");
  const [coReq2, setCoReq2] = useState("");

  function isValidCourseNumber(courseNumber) {
    const regex = /^[0-9]{3}[A-Z]?[A-Z]?$/;
    return regex.test(courseNumber);
  }

  const handleSubmit = (event) => {
    if (subject === "" || !isValidCourseNumber(courseNumber) || title === "" || creditsNbr === "" || creditsNbr<0 || creditsNbr>5) {
      event.preventDefault(); 
      return ; // Return early if any of the state variables are empty
    }
    
    let preReq = [preReq1, preReq2]
    let coReq = [coReq1, coReq2]
    

    event.preventDefault();

    const newCourse = { id: courses.length+1 ,subject, courseNumber, title, creditsNbr, 
      preReq: preReq.filter((pr) => pr !== ""), // Remove any empty strings from the preReq1 array
      coReq: coReq.filter((cr) => cr !== "") };
    console.log(newCourse)
    setCourses([...courses, newCourse]);
    setSubject("");
    setCourseNumber("");
    setTitle("");
    setCreditsNbr("");
    setPreReq1("");
    setCoReq1("");
    setPreReq2("");
    setCoReq2("");
  };


  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Course</h1>
      <div>
        <label htmlFor="subject">Subject:</label>
        <DropListSubjects subject={subject} setSubject={setSubject}/>
      </div>
      <div>
        <label htmlFor="course-number">Course Number:</label>
        <input
          type="text"
          id="course-number"
          value={courseNumber}
          onChange={(event) => setCourseNumber(event.target.value)}
          // className={courseNumber === "" ? "red-border" : ""} for later
          //.red-border {
          //   border-color: red;
          // }
        />
        <label> Format Example: 498 or 498A or 498AA</label>
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="credits-number">Credits Number:</label>
        <input
          type="text"
          id="credits-number"
          value={creditsNbr}
          onChange={(event) => setCreditsNbr(event.target.value)}
     />
      </div>
      <div>
        <label htmlFor="pre-req">Pre requisites:</label>
        <DropListCourses currentCourse={subject+courseNumber} elementCourse={preReq1} setElementCourse={setPreReq1} courses={courses}/>    
        <DropListCourses currentCourse={subject+courseNumber} elementCourse={preReq2} setElementCourse={setPreReq2} courses={courses}/>    

      </div>
      <div>
        <label htmlFor="co-req">Co requisites:</label>
        <DropListCourses currentCourse={subject+courseNumber} elementCourse={coReq1} setElementCourse={setCoReq1} courses={courses}/>    
        <DropListCourses currentCourse={subject+courseNumber} elementCourse={coReq2} setElementCourse={setCoReq2} courses={courses}/>    

      </div>

      <div> 

    </div>
      <button type="submit" onClick={handleSubmit}>Add Course</button>    </form>
 );
};

export default AddCourse;
