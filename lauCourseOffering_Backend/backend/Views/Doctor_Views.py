from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Doctor, Availability
from ..serializers import DoctorSerializer, AvailabilitySerializer
from django.db import connection


class DoctorsApi(APIView):
    def get(self, request):
        """
        Handle the GET request.

        Retrieve doctor(s) and their availability sessions based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response containing the doctor(s) and their availability sessions.
        """
        if "doctor_id" in request.data:
            # Retrieve a specific doctor by ID
            doctor = Doctor.objects.filter(id=request.doctor_id).first()

            # Return a JSON response with the serialized doctor data
            return Response({
                "message": "success",
                "doctors": DoctorSerializer(doctor).data
            })
        else:
            # Retrieve all doctors
            doctors = Doctor.objects.all()
            doctorSerializer = DoctorSerializer(doctors, many=True)
            doctors = doctorSerializer.data

            for doctor in doctors:
                sessions = []
                for session in doctor['availability']:
                    # Retrieve availability session for each doctor
                    availability = Availability.objects.filter(id=session).first()
                    availability = AvailabilitySerializer(availability).data
                    sessions.append(availability)
                # Add availability sessions to the doctor data
                doctor["sessions"] = sessions

            # Return a JSON response with the serialized doctors data
            return Response({
                "message": "success",
                "doctors": doctorSerializer.data
            })

    def post(self, request):
        """
        Handle the POST request.

        Create doctor and availability sessions based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        times = request.data["availabilities"]
        doctor = request.data["doctor"]
        times_ids = []

        for time in times:
            # Create availability sessions
            timeSerializer = AvailabilitySerializer(data=time)
            timeSerializer.is_valid(raise_exception=True)
            timeSerializer.save()
            times_ids.append(timeSerializer.data['id'])

        doctor["availability"] = times_ids
        doctorSerializer = DoctorSerializer(data=doctor)
        doctorSerializer.is_valid(raise_exception=True)
        doctorSerializer.save()

        # Return a JSON response indicating success
        return Response({
            "message": "success"
        })


class DeleteDoctor(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Delete a doctor and their associated availability sessions based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        doctor = Doctor.objects.filter(id=request.data['id']).first()

        if doctor:
            sessions = doctor.availability.all()
            doctor.delete()

            for session in sessions:
                # Delete availability sessions associated with the doctor
                Availability.objects.get(session).delete()

            # Return a JSON response indicating success
            return Response({
                "message": "success"
            })
        else:
            # If the doctor with the provided ID does not exist, return an error response
            return Response({
                "message": "Doctor does not exist"
            })


class DoctorUpdate(APIView):
    def post(self, request):
        """
        Handle the POST request.

        Update a doctor and their availability sessions based on the provided data.

        :param request: The HTTP request object.
        :return: A JSON response indicating the success or failure of the operation.
        """
        try:
            doctor = Doctor.objects.get(pk=request.data["doctor"]["id"])
        except Doctor.DoesNotExist:
            # If the doctor with the provided ID does not exist, return an error response
            return Response({"message": "Doctor not found."})

        sessions = doctor.availability.all()
        for session in sessions:
            # Delete existing availability sessions associated with the doctor
            session.delete()

        times = request.data['availabilities']
        times_ids = []

        for time in times:
            # Create new availability sessions
            timeSerializer = AvailabilitySerializer(data=time)
            timeSerializer.is_valid(raise_exception=True)
            timeSerializer.save()
            doctor.availability.add(timeSerializer.data["id"])
            times_ids.append(timeSerializer.data['id'])

        serializer = DoctorSerializer(doctor, data=request.data["doctor"])
        if serializer.is_valid(raise_exception=True):
            # Update the doctor data
            serializer.save()

            # Return a JSON response indicating success
            return Response({
                "message": "success"
            })
