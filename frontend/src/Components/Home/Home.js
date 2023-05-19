import { useState } from "react";
import UploadCSV from "./UploadCSV";
import CourseOffering from "./CourseOffering";
import TimeTableComponent from "./TimeTable";
import "../../CSS/Home.css";
const Home = ({ courses }) => {
  const [sections, setSections] = useState([]);
  //if true shows upload Exel, else shows CourseOffering
  const [activeOffering, setActiveOffering] = useState(true);

  return (
    <div>
      <CourseOffering
        active={activeOffering}
        setActive={setActiveOffering}
        sections={sections}
        setSections={setSections}
        courses={courses}
      />
      <UploadCSV
        active={activeOffering}
        setActive={setActiveOffering}
        sections={sections}
        setSections={setSections}
      />
    </div>
  );
};

export default Home;
