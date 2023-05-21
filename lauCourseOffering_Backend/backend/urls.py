from django.urls import path
from .Views.Major_Views import MajorApi, MajorUpdateView
from .Views.Course_Views import CoursesApi, BulkCourse, DeleteCourse, CourseUpdate
from .Views.Student_Views import StudentsApi
from .Views.Section_Views import SectionsApi
from .Views.Doctor_Views import DoctorsApi, DeleteDoctor, DoctorUpdate


urlpatterns = [
    path("courses", CoursesApi.as_view()),
    path("courses/delete", DeleteCourse.as_view()),
    path("multicourses", BulkCourse.as_view()),
    path("excel", StudentsApi.as_view()),
    path("sections", SectionsApi.as_view()),
    path("major", MajorApi.as_view()),
    path("doctors", DoctorsApi.as_view()),
    path("doctors/delete", DeleteDoctor.as_view()),
    path("major/update", MajorUpdateView.as_view()),
    path("doctors/update", DoctorUpdate.as_view()),
    path("courses/update", CourseUpdate.as_view())
]
