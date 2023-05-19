from django.urls import path
from .Views.Major_Views import MajorApi
from .Views.Course_Views import CoursesApi, BulkCourse, DeleteCourse
from .Views.Student_Views import StudentsApi
from .Views.Section_Views import SectionsApi
from .Views.Doctor_Views import DoctorsApi

urlpatterns = [
    path("courses", CoursesApi.as_view()),
    path("courses/delete", DeleteCourse.as_view()),
    path("multicourses", BulkCourse.as_view()),
    path("excel", StudentsApi.as_view()),
    path("sections", SectionsApi.as_view()),
    path("major", MajorApi.as_view()),
    path("doctors", DoctorsApi.as_view())
]
