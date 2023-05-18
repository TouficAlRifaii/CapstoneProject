from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, F
from ..serializers import SectionSerializer
from ..models import Course, CourseRelationShip, Section, Student


class SectionsApi(APIView):
    def post(self, request):
        Section.objects.all().delete()

        # Loop through all courses
        for course in Course.objects.all():
            for student in Student.objects.all():
                # Get the courses the student has already taken
                taken_courses = student.courses.all()
                student_major = student.major

                # Check if the student's major requires the course
                if student_major.courses.filter(id=course.id).exists():
                    # Check if the student is eligible to take the course
                    if course not in taken_courses:
                        if isEligible(course, taken_courses):
                            section, created = Section.objects.get_or_create(course=course, campus=student.campus,
                                                                             defaults={'numOfSections': 1,
                                                                                       'numOfStudents': 0,
                                                                                       'campus': student.campus})
                            section.numOfStudents = F('numOfStudents') + 1
                            section.save(update_fields=['numOfStudents'])

        sections = Section.objects.all()
        for section in sections:
            students = section.numOfStudents
            numOfSections = section.numOfSections
            flag = (students // section.capacity - numOfSections) > 0
            if flag:
                numOfSections += students // section.capacity - numOfSections
            section.numOfSections = numOfSections
            section.save(update_fields=["numOfSections"])

        allSections = Section.objects.all()
        sectionsSerializer = SectionSerializer(allSections, many=True)
        return Response({
            "message": "success",
            "sections": sectionsSerializer.data
        })


def isEligible(course, takenCourses):
    if course in takenCourses:
        return False

    else:
        substitutes = course.substitutes.all()
        for substitute in substitutes:
            if substitute in takenCourses:
                return False
        prerequisites = CourseRelationShip.objects.filter(mainCourse=course, isPrerequisite=True)
        corequisites = CourseRelationShip.objects.filter(mainCourse=course, isPrerequisite=False)
        if prerequisites.filter(~Q(secondCourse__in=takenCourses)).count() == 0:
            if corequisites.filter(~Q(secondCourse__in=takenCourses)).count() == 0:
                return True
            else:
                for coreq in corequisites:
                    coCourse = coreq.secondCourse
                    if coCourse not in takenCourses:
                        if not isEligible(course=coCourse, takenCourses=takenCourses):
                            return False
                return True
        else:
            return False
