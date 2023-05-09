from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q , F
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, CourseSerializer , CourseRelationSerializer, StudentSerializer , SectionSerializer
from .models import User, Course , CourseRelationShip , Section , Student, Major
from .excelOps import readExcel
import jwt
import datetime

# Create your views here.


def checkToken(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    return payload['id']


class CreateUserApi(APIView):

    def post(self, request):
        user = User.objects.filter(id=checkToken(
            request), isChaiperson=True).first
        if user:

            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class LoginApi(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UsersListApi(APIView):
    def get(self, request):

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class CoursesApi(APIView):
    def get(self, request):
        if 'course_id' in request.data:
            course = Course.objects.get(
                id=request.data['course_id'])
            if course is None: 
                return Response({
                    "message" : "Course Does not exist"
                })
            relationships = CourseRelationShip.objects.filter(mainCourse=course.id)
            serializer = CourseSerializer(course)
            relationshipsSerializer = CourseRelationSerializer(relationships , many= True)
            return Response({
                "course" : serializer.data,
                "relations" : relationshipsSerializer.data
            })
        else:
            courses = Course.objects.all()
            relationships = CourseRelationShip.objects.all()
            coursesSerializer = CourseSerializer(courses, many=True)
            relationshipsSerializer = CourseRelationSerializer(relationships, many=True)
            return Response({
                "courses" : coursesSerializer.data,
                "relations" : relationshipsSerializer.data
            })
    
    def post(self, request):
        serializer = CourseSerializer(data=request.data["course"])
        serializer.is_valid()
        relationsSerializers =[] 
        
        for relation in request.data['relations']: 
            relationSerializer = CourseRelationSerializer(data=relation)
            relationSerializer.is_valid()
            relationsSerializers.append(relationSerializer)
        serializer.save()
        for relation in relationsSerializers:
            relation.save()
        return Response({
            "message": "success"
        })

class BulkCourse(APIView):
    def post(self, request):
        checkToken(request=request)
        courses = request.data['courses']
        
        for i in courses: 
        
            serializer = CourseSerializer(data= i)
            serializer.is_valid()
            serializer.save()

        return Response({
            "message": "success"
        })
    
class RequisitesApi(APIView):
    def post(self, request):
        checkToken(request=request)

        prerequisites = request.data['prerequisites']
        corequisites = request.data['corequisites']

        if len(prerequisites>0):
            for i in prerequisites:
                data = {
                    "isPrerequisite": True,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i

                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()
        if len(corequisites>0):
            for i in corequisites:
                data = {
                    "isPrerequisite": False,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i

                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()

class StudentsApi(APIView):
    def post(self, request):
        Student.objects.all().delete()
        existing_courses = Course.objects.all()
        serializedCourses = CourseSerializer(existing_courses, many=True)
        serializedCourses = serializedCourses.data
        students = readExcel(request.path)

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
                existingCourse = [d for d in serializedCourses if d.get('courseNumber') == number and d.get("subject") == courseSubject] 
                if existingCourse:
                    course_id = existingCourse[0]["id"]
                    courses.append(course_id)
                else:
                    courseInfo = {
                        "subject" : courseSubject,
                        "courseNumber" : number,
                        "title" : "TBA",
                        "creditsNumber" : 3
                    }
                    serializer = CourseSerializer(data=courseInfo)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    course = Course.objects.filter(subject=courseSubject,courseNumber=number).first()
                    courses.append(course.id)
            data["courses"] = courses
            serializedStudent = StudentSerializer(data=data)
            serializedStudent.is_valid(raise_exception=True)
            serializedStudent.save()
        return Response({
            "message" : "success"
        })
    
class SectionsApi(APIView):
    def post(self, request):
        Section.objects.all().delete()
    # Loop through all courses
        for course in Course.objects.all():
            for student in Student.objects.all():
                # Get the courses the student has already taken
                taken_courses = student.courses.all()
                # Check if the student is eligible to take the course
                if course not in taken_courses:
                    if isEligible(course, taken_courses):
                            # Get or create the section for the course
                            section , created= Section.objects.get_or_create(course=course, defaults={'numOfSections': 1, 'numOfStudents': 0, 'campus': 'Byblos'})
                            # Increment the number of students in the section
                            section.numOfStudents = F('numOfStudents') + 1
                            section.save(update_fields=['numOfStudents'])
                        
                            
                    
        sections = Section.objects.all()
        for section in sections: 
            students = section.numOfStudents
            numOfSections = section.numOfSections
            flag = (students//40 - numOfSections) >0
            if flag: 
                numOfSections += students//40 - numOfSections
            section.numOfSections = numOfSections
            section.save(update_fields=["numOfSections"])
        return Response({

            "message" : "success"
        })
              


def isEligible(course, takenCourses):
    if course in takenCourses:
        return False
    else: 
        prerequisites = CourseRelationShip.objects.filter(mainCourse=course , isPrerequisite = True)
        corequisites = CourseRelationShip.objects.filter(mainCourse=course , isPrerequisite = False)
        if  prerequisites.filter(~Q(secondCourse__in=takenCourses)).count() == 0:
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