import { utils, write, book_append_sheet, book_new } from "xlsx";

const Download = ({ elements, courses }) => {
  const handleDownload = () => {
    const worksheetData = elements.map((element) => {
      const course = courses.find((c) => c.id === element.course);
      const courseName = course
        ? `${course.subject}${course.courseNumber}`
        : "";

      return {
        Campus: element.campus,
        Course: courseName,
        "Number of Students": element.numOfStudents,
        "Number of Sections": element.numOfSections,
        Capacity: element.capacity,
      };
    });

    const worksheet = utils.json_to_sheet(worksheetData); // Convert the array of objects to a worksheet

    const workbook = book_new(); // Create a new workbook
    book_append_sheet(workbook, worksheet, "Sections"); // Add the worksheet to the workbook

    const dataURL = write(workbook, { type: "base64", bookType: "xlsx" }); // Generate a data URL representing the workbook

    const link = document.createElement("a"); // Create a link element
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${dataURL}`;
    link.download = "courseOffering.xlsx"; // Set the download file name
    link.click(); // Trigger the download by simulating a click
  };

  return (
    <button className="add-form-submit-green" onClick={handleDownload}>
      Download
    </button>
  );
};

export default Download;
