from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, CourseSerializer , CourseRelationSerializer
from .models import User, Course
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
            serializer = CourseSerializer(course)
            return Response(serializer.data)
        else:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
    
    def post(self, request):
        checkToken(request=request)
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid()
        serializer.save()
        
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