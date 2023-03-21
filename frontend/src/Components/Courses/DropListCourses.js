const DropListCourses = ({elementCourse, setElementCourse, courses}) =>{
    return(
        <select id="pre-req" value={elementCourse} onChange={(event) => setElementCourse([(event.target.value)])}>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={`${course.subject}${course.courseNumber}`}>
                {`${course.subject} ${course.courseNumber}`}
              </option>
            ))}
        </select>
    );
}


export default DropListCourses;

