const ListCourseId = ({ course, courses }) => {
  return (
    <td>
      {course
        .map((courseId) => {
          const cId = courseId;
          const course = courses.find((c) => c.id === parseInt(courseId));
          console.log("Course ID:", courseId);
          console.log("Course Object:", course);
          return course ? `${course.subject}${course.courseNumber}` : "";
        })
        .join(" - ")}
    </td>
  );
};

export default ListCourseId;
