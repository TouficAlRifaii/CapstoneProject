import React, { useState } from "react";
import DropListCourses from "./DropListCourses";
import { Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import DropListSubjects from "./DropListSubjects";
//things to look for search adn edit by id, why the values are not showing
const EditCourse = ({ courses, setCourses }) => {
  const { id } = useParams();
  const course = courses.find(course => (course.id).toString() === id);
  const [subject, setSubject] = useState(course.subject);
  const [courseNumber, setCourseNumber] = useState(course.courseNumber);
  const [title, setTitle] = useState(course.title);
  const [creditsNbr, setCreditsNbr] = useState(course.creditsNbr);
  
  const [preReq1, setPreReq1] = useState(course.preReq[0] || "");
  const [preReq2, setPreReq2] = useState(course.preReq[1] || "");
  
  const [coReq1, setCoReq1] = useState(course.coReq[0] || "");
  const [coReq2, setCoReq2] = useState(course.coReq[1] || "");

  
  const navigate = useNavigate();

  function isValidCourseNumber(courseNumber) {
    const regex = /^[0-9]{3}[A-Z]?[A-Z]?$/;
    return regex.test(courseNumber);
  }

  const handleSubmit = (event) => {
    if (subject === "" || !isValidCourseNumber(courseNumber) || title === "" || creditsNbr === "" || creditsNbr<0 || creditsNbr>5) {
      event.preventDefault();
      return; // Return early if any of the state variables are empty
    }
  
    let preReq = [preReq1, preReq2]
    let coReq = [coReq1, coReq2]
  
    event.preventDefault();
  
    const editedCourse = {
      id: course.id,
      subject,
      courseNumber,
      title,
      creditsNbr,
      preReq: preReq.filter(pr => pr !== ""),
      coReq: coReq.filter(cr => cr !== "")
    };
    setCourses(prevCourses => {
      return prevCourses.map(prevCourse => {
        if (prevCourse.id === editedCourse.id) {
          return editedCourse; // Return the edited course if the IDs match
        } else {
          return prevCourse; // Otherwise, return the previous course
        }
      });
    });
  
    // Reset the form state variables
    setSubject("");
    setCourseNumber("");
    setTitle("");
    setCreditsNbr("");
    setPreReq1("");
    setCoReq1("");
    setPreReq2("");
    setCoReq2("");
    navigate("/courses")
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Course</h1>
      <div>
        <label htmlFor="subject">Subject:</label>
        <DropListSubjects disabled={true} subject={subject} setSubject={setSubject}/>
      </div>
      <div>
        <label htmlFor="course-number">Course Number:</label>
        <input
          disabled
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
        <DropListCourses elementCourse={coReq1} setElementCourse={setCoReq1} courses={courses}/>    
        <DropListCourses elementCourse={coReq2} setElementCourse={setCoReq2} courses={courses}/>    

      </div>

      <div> 

    </div>
      <button type="submit" onClick={handleSubmit}>Add Course</button>    </form>
 );
};

export default EditCourse;
