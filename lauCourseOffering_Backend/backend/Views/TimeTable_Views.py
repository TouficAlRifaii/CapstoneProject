from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Section, Doctor
from ..serializers import SectionSerializer


class TimeTable(APIView):
    def get(self, request):
        from collections import defaultdict

        # Assuming you have a list of courses and a list of doctors
        sections = Section.objects.all()
        doctors = Doctor.objects.all()

        # Dictionary to store the assigned courses for each time slot
        time_slots = defaultdict(list)

        # Iterate over the courses and assign them to time slots
        for section in sections:
            assigned = False
            for doctor in section.course.doctors.all():
                if not assigned:
                    for availability in doctor.availability.all():
                        if not assigned:

                            # Check if the time slot already has two courses assigned
                            if len(time_slots[availability.days]) < 2:
                                parsedSection = SectionSerializer(section).data
                                parsedSection["start"] = availability.start
                                parsedSection['end'] = availability.end
                                # Check if the capacity allows for more students in the section
                                time_slots[availability.days].append(parsedSection)
                                assigned = True

        return Response({
            "message": "success",
            "timeTable": time_slots
        })
