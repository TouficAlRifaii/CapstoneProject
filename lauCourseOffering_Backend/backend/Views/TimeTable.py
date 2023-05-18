from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Course, Doctor


class TimeTable(APIView):
    def post(self, request):
        from collections import defaultdict

        # Assuming you have a list of courses and a list of doctors
        courses = Course.objects.all()
        doctors = Doctor.objects.all()

        # Dictionary to store the assigned courses for each time slot
        time_slots = defaultdict(list)

        # Iterate over the courses and assign them to time slots
        for course in courses:
            assigned = False
            for doctor in course.doctors.all():
                if not assigned:
                    for availability in doctor.availability.all():
                        if not assigned:
                            # Check if the time slot already has two courses assigned
                            if len(time_slots[availability.day]) < 2:
                                # Check if the capacity allows for more students in the section
                                if course.numOfStudents <= course.capacity:
                                    # Assign the course to the time slot
                                    time_slots[availability.day].append(course)
                                    assigned = True

        # Print the timetable
        return Response({
            "message": "success",
            "timeTable": time_slots
        })
