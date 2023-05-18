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
        serializer = CourseSerializer(data=request.data["course"])
        serializer.is_valid(raise_exception=True)
        with connection.cursor() as cursor:
            cursor.execute("SET information_schema_stats_expiry = 0;")
            cursor.execute(f"SHOW TABLE STATUS FROM capstoneproject LIKE 'backend_course'")
            table_status = cursor.fetchone()
            auto_increment = table_status[10]
            next_id = int(auto_increment)
        serializer.save()
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
