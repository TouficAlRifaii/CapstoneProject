from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Major
from ..serializers import MajorSerializer


class MajorApi(APIView):
    def get(self, request):
        """
        Handle the GET request.

        Retrieve major(s) based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response containing the major(s) data.
        """
        if "major_id" in request.data:
            # Retrieve a specific major by ID
            major = Major.objects.filter(id=request.major_id).first()

            # Return a JSON response with the serialized major data
            return Response({
                "message": "success",
                "major": MajorSerializer(major).data
            })
        else:
            # Retrieve all majors
            majors = Major.objects.all()
            majorsSerialized = MajorSerializer(majors, many=True)

            # Return a JSON response with the serialized majors data
            return Response({
                "message": "success",
                "majors": majorsSerialized.data
            })

    def post(self, request):
        """
        Handle the POST request.

        Create a new major based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        major = request.data
        majorSerialized = MajorSerializer(data=major)
        majorSerialized.is_valid(raise_exception=True)
        majorSerialized.save()

        # Return a JSON response indicating success
        return Response({
            "message": "success"
        })


class MajorUpdateView(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Update a major based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        try:
            major = Major.objects.get(pk=request.data["id"])
        except Major.DoesNotExist:
            # If the major with the provided ID does not exist, return an error response
            return Response({"message": "Major not found."})

        serializer = MajorSerializer(major, data=request.data)
        if serializer.is_valid():
            # Update the major data
            serializer.save()

            # Return a JSON response indicating success
            return Response({
                "message": "success"
            })
