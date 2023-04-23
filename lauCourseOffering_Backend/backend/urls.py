from django.urls import path
from .views import CreateUserApi , LoginApi, UsersListApi, LogoutView , CoursesApi , BulkCourse , StudentsApi, SectionsApi

urlpatterns = [
    path("createUser", CreateUserApi.as_view()),
    path("login", LoginApi.as_view()),
    path("users" , UsersListApi.as_view()),
    path("logout", LogoutView.as_view()),
    path("courses", CoursesApi.as_view()),
    path("multicourses", BulkCourse.as_view()),
    path("excel" , StudentsApi.as_view() ),
    path("sections" , SectionsApi.as_view()),
]
