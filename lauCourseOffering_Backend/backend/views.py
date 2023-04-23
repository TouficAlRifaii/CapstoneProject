from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q , F
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, CourseSerializer , CourseRelationSerializer , StudentSerializer , SectionSerializer
from .models import User, Course , Student , CourseRelationShip , Section
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
        checkToken(request)

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
        checkToken(request=request)
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
        checkToken(request=request)
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
        existing_courses = Course.objects.filter(subject="CSC")
        serializedCourses = CourseSerializer(existing_courses, many=True)
        serializedCourses = serializedCourses.data
        
        students = readExcel()
        sections = {}
        
        
        for student in students:
            data = {} 
            data['takenCredits'] = student['Total Earned Credits']
            data['remainingCredits'] = student['Remaining Credits']
            courses = []

            for course in student['courses']:
                courseNumber = course[3:]
                existingCourse = [d for d in serializedCourses if d.get('courseNumber') == courseNumber]
                course_id = existingCourse[0]["id"]
                courses.append(course_id)
            data["courses"] = courses

            serializedStudent = StudentSerializer(data=data)
            serializedStudent.is_valid()
            serializedStudent.save()
        #     for course in courses:
        #         key = course
        #         if key in sections.keys():
        #             sections[key]['numOfStudents'] = sections[key]['numOfStudents'] + 1
        #             sections[key]['numOfSections'] = sections[key]['numOfSections'] + ((sections[key]['numOfStudents']//40 - sections[key]['numOfSections']) if (sections[key]['numOfStudents']//40 - sections[key]['numOfSections'] > 0) else 0 ) 
                    
        #         else : 
        #             value = {}
        #             value['numOfStudents'] = 1
        #             value['numOfSections'] = 1
        #             value['campus'] = "Byblos"
        #             value['course'] = course
                    
        #             sections[key] = value

            
        # for section in sections:
        #     sectionSerializer = SectionSerializer(data=sections[section])
        #     sectionSerializer.is_valid()
        #     sectionSerializer.save()
        return Response({
            "message" : "success"
        })
    
class SectionsApi(APIView):
    def post(self, request):
        Section.objects.all().delete()
    # Loop through all courses
        for course in Course.objects.all():
            # Get the prerequisite and co-requisite courses
            prerequisites = CourseRelationShip.objects.filter(mainCourse=course, isPrerequisite=True)
            corequisites = CourseRelationShip.objects.filter(mainCourse=course, isPrerequisite=False)
            
            # Loop through all students
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