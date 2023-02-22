from django.urls import path
from .views import CreateUserApi , LoginApi, UsersListApi, LogoutView , CoursesApi

urlpatterns = [
    path("createUser", CreateUserApi.as_view()),
    path("login", LoginApi.as_view()),
    path("users" , UsersListApi.as_view()),
    path("logout", LogoutView.as_view()),
    path("courses", CoursesApi.as_view())
]
