from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Doctor, Availability
from ..serializers import DoctorSerializer, AvailabilitySerializer
from django.db import connection


class DoctorsApi(APIView):
    def get(self, request):
        if "doctor_id" in request.data:
            doctor = Doctor.objects.filter(id=request.doctor_id).first()
            return Response({
                "message": "success",
                "doctors": DoctorSerializer(doctor).data
            })
        else:
            doctors = Doctor.objects.all()
            doctorSerializer = DoctorSerializer(doctors, many=True)
            doctors = doctorSerializer.data

            for doctor in doctors:
                sessions = []
                for session in doctor['availability']:
                    availability = Availability.objects.filter(id=session).first()
                    availability = AvailabilitySerializer(availability).data
                    sessions.append(availability)
                doctor["sessions"] = sessions
            return Response({
                "message": "success",
                "doctors": doctorSerializer.data
            })

    def post(self, request):
        times = request.data["availabilties"]
        doctor = request.data["doctor"]
        times_ids = []
        for time in times:
            timeSerializer = AvailabilitySerializer(data=time)
            timeSerializer.is_valid(raise_exception=True)
            timeSerializer.save()
            print(timeSerializer.data)
            times_ids.append(timeSerializer.data['id'])
        doctor["availability"] = times_ids
        doctorSerializer = DoctorSerializer(data=doctor)
        doctorSerializer.is_valid(raise_exception=True)
        doctorSerializer.save()

        return Response({
            "message": "success"
        })
