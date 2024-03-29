import React from "react";
import * as XLSX from "xlsx";

const Download = ({ sectionsSub, courses }) => {
  const handleDownload = () => {
    // Prepare the data for the worksheet
    const worksheetData = sectionsSub.map((element) => {
      const course = courses.find((c) => c.id === element.course);
      const courseName = course
        ? `${course.subject}${course.courseNumber}`
        : "";

      // Get substitute course names if available
      const substituteNames = element.substitute
        ? element.substitute.map((substituteId) => {
            const substituteCourse = courses.find((c) => c.id === substituteId);
            return substituteCourse
              ? `${substituteCourse.subject}${substituteCourse.courseNumber}`
              : "";
          })
        : [];

      return {
        Campus: element.campus,
        Course: courseName,
        Substitute: substituteNames.join(", "), // Combine substitute course names into a string
        "Number of Students": element.numOfStudents,
        "Number of Sections": element.numOfSections,
        Capacity: element.capacity,
      };
    });

    // Create a new worksheet and workbook using XLSX utility functions
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");

    // Convert the workbook to base64 data URL
    const dataURL = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${dataURL}`;
    link.download = "courseOffering.xlsx";
    link.click();
  };

  return (
    <button className="add-form-submit-green" onClick={handleDownload}>
      Download
    </button>
  );
};

export default Download;
