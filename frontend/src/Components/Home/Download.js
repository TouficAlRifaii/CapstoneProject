import * as XLSX from "xlsx";

const Download = ({ elements }) => {
  const handleDownload = () => {
<<<<<<< HEAD

      const worksheetData = elements.map((element) => {
        const course = courses.find((c) => c.id === element.course);
        const courseName = course ? `${course.subject}${course.courseNumber}` : "";
  
        return {
          Campus: element.campus,
          Course: courseName,
          "Number of Students": element.numOfStudents,
          "Number of Sections": element.numOfSections,
          Capacity: element.capacity,
        };
      });
=======
    const worksheetData = elements.map((element) => ({
      Campus: element.campus,
      Course: element.course,
      "Number of Students": element.numOfStudents,
      "Number of Sections": element.numOfSections,
      Capacity: element.capacity,
    }));
>>>>>>> parent of 1b5dec9 (Linking course offering)

    const worksheet = XLSX.utils.json_to_sheet(worksheetData); // Convert the array of objects to a worksheet

    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sections"); // Add the worksheet to the workbook

    const dataURL = XLSX.write(workbook, { type: "base64", bookType: "xlsx" }); // Generate a data URL representing the workbook

    const link = document.createElement("a"); // Create a link element
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${dataURL}`;
    link.download = "courseOffering.xlsx"; // Set the download file name
    link.click(); // Trigger the download by simulating a click
  };

  return (
    <button className="add-form-submit" onClick={handleDownload}>
      Download
    </button>
  );
};

export default Download;
