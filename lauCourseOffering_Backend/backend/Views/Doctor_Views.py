from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Doctor, Availability
from ..serializers import DoctorSerializer, AvailabilitySerializer
from django.db import connection


class DoctorsApi(APIView):
    def get(self, request):
        if request.major_id:
            major = Doctor.objects.filter(id=request.major_id).first()
            return Response({
                "major": DoctorSerializer(major).data
            })
        else:
            majors = Doctor.objects.all()
            majorsSerialized = DoctorSerializer(majors, many=True)
            return Response({
                "majors": majorsSerialized.data
            })

    def post(self, request):
        times = request.data["availabilties"]
        doctor = request.data["doctor"]
        times_ids = []
        for time in times:
            timeSerializer = AvailabilitySerializer(data=time)
            timeSerializer.is_valid(raise_exception=True)
            with connection.cursor() as cursor:
                cursor.execute("SET information_schema_stats_expiry = 0;")
                cursor.execute(f"SHOW TABLE STATUS FROM capstoneproject LIKE 'backend_availability'")
                table_status = cursor.fetchone()
                auto_increment = table_status[10]
                times_ids.append(int(auto_increment))
            timeSerializer.save()
        doctor["availability"] = times_ids
        doctorSerializer = DoctorSerializer(data=doctor)
        doctorSerializer.is_valid(raise_exception=True)
        doctorSerializer.save()

        return Response({
            "message": "success"
        })
