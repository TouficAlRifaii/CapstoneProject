from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import CourseSerializer, StudentSerializer
from ..models import Course, Student, Major
from ..excelOps import readExcel


class StudentsApi(APIView):
    def post(self, request):
        Student.objects.all().delete()
        existing_courses = Course.objects.all()
        serializedCourses = CourseSerializer(existing_courses, many=True)
        serializedCourses = serializedCourses.data
        print(request.FILES)
        print(request.data)
        students = readExcel(request.FILES.get("excel"))

        for student in students:
            data = {}
            major = Major.objects.filter(title=student['Program']).first()
            data['major'] = major.id
            data['takenCredits'] = eval(student['Earned Credits'])
            data['remainingCredits'] = major.credits - data['takenCredits']
            data['campus'] = student['Campus']
            courses = []
            for course in student['courses']:
                courseSubject = course[0:3]
                number = course[3:]
                print(courseSubject + "  " + number)
                existingCourse = [d for d in serializedCourses if
                                  d.get('courseNumber') == number and d.get("subject") == courseSubject]
                if existingCourse:
                    course_id = existingCourse[0]["id"]
                    courses.append(course_id)
                else:
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
            serializedStudent = StudentSerializer(data=data)
            serializedStudent.is_valid(raise_exception=True)
            serializedStudent.save()
        return Response({
            "message": "success"
        })
