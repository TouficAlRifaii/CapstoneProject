from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import CourseSerializer, StudentSerializer
from ..models import Course, Student, Major
from openpyxl import load_workbook


class StudentsApi(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Read student data from an Excel file, create student objects, and associate them with courses and majors.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        # Delete all existing students
        Student.objects.all().delete()

        # Get all existing courses
        existing_courses = Course.objects.all()
        serializedCourses = CourseSerializer(existing_courses, many=True)
        serializedCourses = serializedCourses.data

        # Read student data from the uploaded Excel file
        students = readExcel(request.FILES.get("excel"))

        for student in students:
            data = {}
            major = Major.objects.filter(title=student['Program']).first()

            # Create student data
            data['major'] = major.id
            data['takenCredits'] = eval(student['Earned Credits'])
            data['remainingCredits'] = major.credits - data['takenCredits']
            data['campus'] = student['Campus']

            courses = []
            for course in student['courses']:
                courseSubject = course[0:3]
                number = course[3:]

                # Check if the course already exists
                existingCourse = [d for d in serializedCourses if
                                  d.get('courseNumber') == number and d.get("subject") == courseSubject]

                if existingCourse:
                    course_id = existingCourse[0]["id"]
                    courses.append(course_id)
                else:
                    # Create a new course if it doesn't exist
                    courseInfo = {
                        "subject": courseSubject,
                        "courseNumber": number,
                        "title": "TBA",
                        "creditsNumber": 3
                    }
                    serializer = CourseSerializer(data=courseInfo)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    course = Course.objects.filter(subject=courseSubject, courseNumber=number).first()
                    courses.append(course.id)

            data["courses"] = courses

            # Serialize and save the student object
            serializedStudent = StudentSerializer(data=data)
            serializedStudent.is_valid(raise_exception=True)
            serializedStudent.save()

        return Response({
            "message": "success"
        })


def readExcel(file):
    """
    Read student data from an Excel file.

    :param file: The Excel file to read.
    :return: A list of dictionaries representing the student data.
    """
    book = load_workbook(file)
    sheet = book.active

    rows = sheet.rows

    headers = [cell.value for cell in next(rows)]
    all_rows = []
    for row in rows:
        data = {}
        courses = []

        for title, cell in zip(headers, row):
            index = row.index(cell)
            if index > 0 and index <= 3:
                data[title] = cell.value

            elif index > 3:
                if cell.value == 1 or cell.value == 0:
                    courses.append(title)

        data['courses'] = courses
        all_rows.append(data)

    return all_rows
