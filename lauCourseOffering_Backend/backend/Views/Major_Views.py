from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Major
from ..serializers import MajorSerializer


class MajorApi(APIView):
    def get(self, request):
        if request.major_id:
            major = Major.objects.filter(id=request.major_id).first()
            return Response({
                "major": MajorSerializer(major).data
            })
        else:
            majors = Major.objects.all()
            majorsSerialized = MajorSerializer(majors, many=True)
            return Response({
                "majors": majorsSerialized.data
            })
    
    def post(self, request):
        major = request.data
        majorSerialized = MajorSerializer(data=major)
        majorSerialized.is_valid(raise_exception=True)
        majorSerialized.save()
        return Response({
            "message": "success"
        })


class MajorUpdateView(APIView):
    def put(self, request):
        try:
            major = Major.objects.get(pk=request.data["id"])
        except Major.DoesNotExist:
            return Response({"message": "Major not found."})

        serializer = MajorSerializer(major, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "success"
            })