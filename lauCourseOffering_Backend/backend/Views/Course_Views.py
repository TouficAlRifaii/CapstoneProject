from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from ..serializers import CourseSerializer, CourseRelationSerializer
from ..models import Course, CourseRelationShip


class CoursesApi(APIView):
    def get(self, request):
        if 'course_id' in request.data:
            course = Course.objects.get(
                id=request.data['course_id'])
            if course is None:
                return Response({
                    "message": "Course Does not exist"
                })
            relationships = CourseRelationShip.objects.filter(mainCourse=course.id)
            serializer = CourseSerializer(course)
            relationshipsSerializer = CourseRelationSerializer(relationships, many=True)
            return Response({
                "message": "success",
                "course": serializer.data,
                "relations": relationshipsSerializer.data
            })
        else:
            coursesDictionary = list()
            courses = Course.objects.all()
            relationships = CourseRelationShip.objects.all()
            for course in courses:
                dictionary = {}
                dictionary["id"] = course.id
                dictionary["subject"] = course.subject
                dictionary["courseNumber"] = course.courseNumber
                dictionary["title"] = course.title
                dictionary["creditsNumber"] = course.creditsNumber
                preReq = []
                coReq = []
                for relationship in relationships:
                    if relationship.mainCourse_id == course.id:
                        if relationship.isPrerequisite:
                            preReq.append(relationship.secondCourse_id)
                        else:
                            coReq.append(relationship.secondCourse_id)
                dictionary["preReq"] = preReq
                dictionary["coReq"] = coReq
                coursesDictionary.append(dictionary)
            return Response({
                "message": "success",
                "courses": coursesDictionary
            })

    def post(self, request):
        data = request.data['course']
        subject = data['subject']
        courseNumber = data['courseNumber']
        course = Course.objects.filter(subject=subject, courseNumber=courseNumber).first()
        if course:
            return Response({
                "message": "Course Already exist"
            })
        serializer = CourseSerializer(data=request.data["course"])
        serializer.is_valid(raise_exception=True)
        serializer.save()
        next_id = serializer.data['id']
        for relation in request.data['relations']:
            relation["mainCourse_id"] = next_id
            relationSerializer = CourseRelationSerializer(data=relation)
            if relationSerializer.is_valid():
                relationSerializer.save()

        return Response({
            "message": "success"
        })


class DeleteCourse(APIView):
    def post(self, request):

        course = Course.objects.filter(id=request.data['id']).first()
        if course:

            course.delete()
            return Response({
                "message": "success"
            })
        else:
            return Response({
                "message": "Course does not exist"
            })


class BulkCourse(APIView):
    def post(self, request):
        courses = request.data['courses']

        for i in courses:
            serializer = CourseSerializer(data=i)
            serializer.is_valid()
            serializer.save()

        return Response({
            "message": "success"
        })


class RequisitesApi(APIView):
    def post(self, request):
        prerequisites = request.data['prerequisites']
        corequisites = request.data['corequisites']

        if len(prerequisites > 0):
            for i in prerequisites:
                data = {
                    "isPrerequisite": True,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i

                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()
        if len(corequisites > 0):
            for i in corequisites:
                data = {
                    "isPrerequisite": False,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i

                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()


class CourseUpdate(APIView):
    def post(self, request):
        try:
            course = Course.objects.get(pk=request.data["course"]['id'])
        except Course.DoesNotExist:
            return Response({"message": "Course not found."})
        course_relations = CourseRelationShip.objects.filter(mainCourse_id=request.data["course"]['id'])
        if course_relations.exists():
            course_relations.delete()
        serializer = CourseSerializer(course, data=request.data["course"])
        if serializer.is_valid():
            serializer.save()
            for relation in request.data["relations"]:
                relation['mainCourse_id'] = request.data["course"]['id']
                relationSerializer = CourseRelationSerializer(data=relation)
                relationSerializer.is_valid(raise_exception=True)
                relationSerializer.save()
            return Response({
                "message": "success"
            })
