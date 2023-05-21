const ListCourseId = ({ course, courses }) => {
  //Courses are stored as ids, this is to display course for users
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
