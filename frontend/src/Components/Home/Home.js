import { useState } from "react";
import UploadCSV from "./UploadCSV";
import CourseOffering from "./CourseOffering";
import "../../CSS/Home.css";
const Home = ({ courses }) => {
  const [sections, setSections] = useState([
    {
      id: 1,
      campus: "Byblos",
      numOfStudents: 21,
      numOfSections: 1,
      course: 1,
      capacity: 40,
    },
    {
      id: 1143,
      campus: "Beirut",
      numOfStudents: 31,
      numOfSections: 1,
      course: 43,
      capacity: 40,
    },
    {
      id: 1144,
      campus: "Byblos",
      numOfStudents: 31,
      numOfSections: 1,
      course: 44,
      capacity: 40,
    },
    {
      id: 1145,
      campus: "Beirut",
      numOfStudents: 51,
      numOfSections: 1,
      course: 44,
      capacity: 40,
    },
    {
      id: 1146,
      campus: "Beirut",
      numOfStudents: 181,
      numOfSections: 4,
      course: 45,
      capacity: 40,
    },
    {
      id: 1147,
      campus: "Byblos",
      numOfStudents: 48,
      numOfSections: 1,
      course: 45,
      capacity: 40,
    },
    {
      id: 1148,
      campus: "Byblos",
      numOfStudents: 19,
      numOfSections: 1,
      course: 46,
      capacity: 40,
    },
  ]);
  //if true shows upload Exel, else shows CourseOffering
  const [activeGenerate, setActiveGenerate] = useState(true);

  return (
    <div>
      <CourseOffering
        active={activeGenerate}
        setActive={setActiveGenerate}
        sections={sections}
        setSections={setSections}
        courses={courses}
      />
      <UploadCSV active={activeGenerate} setActive={setActiveGenerate} />
    </div>
  );
};

export default Home;
