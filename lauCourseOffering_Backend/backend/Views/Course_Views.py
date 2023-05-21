from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from ..serializers import CourseSerializer, CourseRelationSerializer
from ..models import Course, CourseRelationShip


class CoursesApi(APIView):
    def get(self, request):
        """
        Handle the GET request.

        If 'course_id' is present in the request data, retrieve the corresponding course
        and its relationships. Otherwise, retrieve all courses and their relationships.

        :param request: The HTTP request object.
        :return: A JSON response containing the course(s) and their relationships.
        """
        if 'course_id' in request.data:
            # Retrieve the course with the provided ID from the database
            course = Course.objects.get(id=request.data['course_id'])

            if course is None:
                # If the course does not exist, return an error response
                return Response({
                    "message": "Course Does not exist"
                })

            # Retrieve relationships for the course
            relationships = CourseRelationShip.objects.filter(mainCourse=course.id)

            # Serialize the course and relationships data
            serializer = CourseSerializer(course)
            relationshipsSerializer = CourseRelationSerializer(relationships, many=True)

            # Return a JSON response with the serialized data
            return Response({
                "message": "success",
                "course": serializer.data,
                "relations": relationshipsSerializer.data
            })

        else:
            # Retrieve all courses and relationships from the database
            courses = Course.objects.all()
            relationships = CourseRelationShip.objects.all()

            # Create a list to hold course dictionaries
            coursesDictionary = list()

            # Iterate over each course
            for course in courses:
                # Create a dictionary to hold course attributes
                dictionary = {}
                dictionary["id"] = course.id
                dictionary["subject"] = course.subject
                dictionary["courseNumber"] = course.courseNumber
                dictionary["title"] = course.title
                dictionary["creditsNumber"] = course.creditsNumber

                # Retrieve substitutes for the course and add them to a list
                substitutes = course.substitutes.all()
                subList = []
                for substitute in substitutes:
                    subList.append(substitute.id)
                dictionary["substitutes"] = subList

                # Initialize lists for prerequisites and corequisites
                preReq = []
                coReq = []

                # Iterate over each relationship
                for relationship in relationships:
                    if relationship.mainCourse_id == course.id:
                        # If the relationship belongs to the current course
                        if relationship.isPrerequisite:
                            # If it's a prerequisite, add the second course ID to prerequisites
                            preReq.append(relationship.secondCourse_id)
                        else:
                            # If it's a corequisite, add the second course ID to corequisites
                            coReq.append(relationship.secondCourse_id)

                # Add prerequisites and corequisites to the course dictionary
                dictionary["preReq"] = preReq
                dictionary["coReq"] = coReq

                # Add the course dictionary to the list
                coursesDictionary.append(dictionary)

            # Return a JSON response with the list of course dictionaries
            return Response({
                "message": "success",
                "courses": coursesDictionary
            })

    def post(self, request):
        """
        Handle the POST request.

        Create a new course and its related relationships based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        data = request.data['course']
        subject = data['subject']
        courseNumber = data['courseNumber']

        # Check if a course with the same subject and course number already exists
        course = Course.objects.filter(subject=subject, courseNumber=courseNumber).first()

        if course:
            # If a course with the same subject and course number exists, return an error response
            return Response({
                "message": "Course Already exists"
            })

        # Create a serializer for the course data
        serializer = CourseSerializer(data=request.data["course"])
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Retrieve the ID of the newly created course
        next_id = serializer.data['id']

        # Iterate over the relationship data and create the relationships
        for relation in request.data['relations']:
            # Set the 'mainCourse_id' field of the relationship to the ID of the newly created course
            relation["mainCourse_id"] = next_id

            # Create a serializer for the relationship data
            relationSerializer = CourseRelationSerializer(data=relation)

            if relationSerializer.is_valid():
                # Save the relationship
                relationSerializer.save()

        # Return a JSON response indicating success
        return Response({
            "message": "success"
        })


class DeleteCourse(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Delete a course based on the provided course ID.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        course = Course.objects.filter(id=request.data['id']).first()

        if course:
            # If a course with the provided ID exists, delete it
            course.delete()
            return Response({
                "message": "success"
            })
        else:
            # If a course with the provided ID does not exist, return an error response
            return Response({
                "message": "Course does not exist"
            })


class BulkCourse(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Create multiple courses based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        courses = request.data['courses']

        for i in courses:
            # Create a serializer for each course data
            serializer = CourseSerializer(data=i)
            serializer.is_valid()
            serializer.save()

        # Return a JSON response indicating success
        return Response({
            "message": "success"
        })


class RequisitesApi(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Create prerequisite and corequisite relationships for a course based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        prerequisites = request.data['prerequisites']
        corequisites = request.data['corequisites']

        if len(prerequisites) > 0:
            # Create prerequisite relationships
            for i in prerequisites:
                data = {
                    "isPrerequisite": True,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i
                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()

        if len(corequisites) > 0:
            # Create corequisite relationships
            for i in corequisites:
                data = {
                    "isPrerequisite": False,
                    "mainCourse_id": request.data['course_id'],
                    "secondCourse_id": i
                }
                serializer = CourseRelationSerializer(data)
                serializer.is_valid()
                serializer.save()

        # Return a JSON response indicating success
        return Response({
            "message": "success"
        })


class CourseUpdate(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Update a course and its relationships based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        try:
            course = Course.objects.get(pk=request.data["course"]['id'])
        except Course.DoesNotExist:
            # If the course with the provided ID does not exist, return an error response
            return Response({"message": "Course not found."})

        course_relations = CourseRelationShip.objects.filter(mainCourse_id=request.data["course"]['id'])
        if course_relations.exists():
            # Delete existing course relationships
            course_relations.delete()

        serializer = CourseSerializer(course, data=request.data["course"])
        if serializer.is_valid(raise_exception=True):
            # Update the course data
            serializer.save()

            for relation in request.data["relations"]:
                # Set the 'mainCourse_id' field of the relationship to the course ID
                relation['mainCourse_id'] = request.data["course"]['id']
                relationSerializer = CourseRelationSerializer(data=relation)
                relationSerializer.is_valid(raise_exception=True)
                relationSerializer.save()

            # Return a JSON response indicating success
            return Response({
                "message": "success"
            })
