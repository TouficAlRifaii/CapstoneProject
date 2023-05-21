from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Section, Doctor, Course, Availability
from ..serializers import SectionSerializer
from django.db.models import Count
from django.http import JsonResponse


# class TimeTable(APIView):
#     def get(self, request):
#         # from collections import defaultdict
#         #
#         # # Assuming you have a list of courses and a list of doctors
#         # sections = Section.objects.all()
#         # doctors = Doctor.objects.all()
#         #
#         # # Dictionary to store the assigned courses for each time slot
#         # time_slots = defaultdict(list)
#         #
#         # # Iterate over the courses and assign them to time slots
#         # for section in sections:
#         #     assigned = False
#         #     for doctor in section.course.doctors.all():
#         #         if not assigned:
#         #             for availability in doctor.availability.all():
#         #                 if not assigned:
#         #
#         #                     # Check if the time slot already has two courses assigned
#         #                     if len(time_slots[availability.days]) < 2:
#         #                         parsedSection = SectionSerializer(section).data
#         #                         parsedSection["start"] = availability.start
#         #                         parsedSection['end'] = availability.end
#         #                         # Check if the capacity allows for more students in the section
#         #                         time_slots[availability.days].append(parsedSection)
#         #                         assigned = True
#         #
#         # return Response({
#         #     "message": "success",
#         #     "timeTable": time_slots
#         # })
#         create_timetable(request)
#
#
# def create_timetable(request):
#     sections = request.data.get('sections')  # Retrieve sections from the request body
#
#     # Step 1: Retrieve the list of courses that need time slots
#     courses = Course.objects.all()
#
#     # Step 2: Retrieve the list of doctors who are available to teach
#     doctors = Doctor.objects.annotate(course_count=Count('courses')).filter(course_count__lt=4)
#
#     # Create a dictionary to track assigned courses
#     assigned_courses = {doctor.id: [] for doctor in doctors}
#
#     # Step 3: For each course, list the doctors who are able to teach it
#     for course in courses:
#         available_doctors = doctors.filter(courses=course)
#
#         # Step 4: For each doctor, list the courses they are available to teach
#         for doctor in available_doctors:
#             available_time_slots = doctor.availability.all()
#
#             # Step 5: Assign the course to an available time slot without conflicts
#             for time_slot in available_time_slots:
#                 conflicting_courses = assigned_courses[doctor.id]
#                 if len(conflicting_courses) < 2:
#                     conflicting_time_slots = [
#                         assigned_time_slot
#                         for assigned_time_slot in conflicting_courses
#                         if assigned_time_slot.days == time_slot.days
#                            and assigned_time_slot.end >= time_slot.start
#                            and assigned_time_slot.start <= time_slot.end
#                     ]
#
#                     if not conflicting_time_slots:
#                         # Assign the course to the time slot and update assigned courses
#                         assigned_courses[doctor.id].append(time_slot)
#                         break
#
#             # Step 6: Assign the course to a conflicting time slot with fewest conflicts if necessary
#             if len(assigned_courses[doctor.id]) < 2:
#                 min_conflicts = float('inf')
#                 chosen_time_slot = None
#
#                 for time_slot in available_time_slots:
#                     conflicting_courses = assigned_courses[doctor.id]
#                     num_conflicts = sum(
#                         1
#                         for assigned_time_slot in conflicting_courses
#                         if assigned_time_slot.days == time_slot.days
#                     )
#
#                     if num_conflicts < min_conflicts:
#                         min_conflicts = num_conflicts
#                         chosen_time_slot = time_slot
#
#                 if chosen_time_slot:
#                     assigned_courses[doctor.id].append(chosen_time_slot)
#
#     # Step 8: Repeat until all doctors have taken their maximum courses possible
#     while doctors.filter(course_count__lt=4).exists():
#         for doctor in doctors:
#             available_courses = Course.objects.filter(doctors=doctor)
#             available_time_slots = doctor.availability.all()
#
#             for time_slot in available_time_slots:
#                 conflicting_courses = assigned_courses[doctor.id]
#                 if len(conflicting_courses) < 2:
#                     conflicting_time_slots = [
#                         assigned_time_slot
#                         for assigned_time_slot in conflicting_courses
#                         if assigned_time_slot.days == time_slot.days
#                            and assigned_time_slot.end >= time_slot.start
#                            and assigned_time_slot.start <= time_slot.end
#                     ]
#
#                     if not conflicting_time_slots:
#                         # Assign the course to the time slot and update assigned courses
#                         assigned_courses[doctor.id].append(time_slot)
#                         doctor.course_count += 1
#                         doctor.save()
#                         break
#
#     # Return the generated timetable as a response
#     timetable = generate_timetable(assigned_courses)
#     return JsonResponse(timetable, safe=False)
#
#
# def generate_timetable():
#     timetable = []
#
#     # Retrieve all time slots with assigned courses
#     assigned_time_slots = Availability.objects.exclude(course__isnull=True)
#
#     # Group the assigned time slots by days
#     grouped_time_slots = assigned_time_slots.values('days').annotate(count=Count('days'))
#
#     # Iterate over the grouped time slots and create timetable entries
#     for grouped_time_slot in grouped_time_slots:
#         day = grouped_time_slot['days']
#         time_slots = assigned_time_slots.filter(days=day)
#
#         # Create a timetable entry for each time slot
#         for time_slot in time_slots:
#             course = time_slot.course
#             doctor = time_slot.doctors.first()
#             entry = {
#                 'day': day,
#                 'start': time_slot.start,
#                 'end': time_slot.end,
#                 'course': course.title,
#                 'doctor': doctor.name
#             }
#             timetable.append(entry)
#
#     return timetable


class TimeTable(APIView):
    def get(self, request):
        return "halo"


def create_timetable(sections):
    doctors = Doctor.objects.all()
