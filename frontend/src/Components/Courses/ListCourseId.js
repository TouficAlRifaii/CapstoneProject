const ListCourseId = ({ course, courses }) => {
  return (
    <td>
      <div className="table-btns">
        {course
          .map((courseId) => {
            const course = courses.find((c) => c.id === parseInt(courseId));

            return course ? `${course.subject}${course.courseNumber}` : "";
          })
          .join(" - ")}
      </div>
    </td>
  );
};

export default ListCourseId;