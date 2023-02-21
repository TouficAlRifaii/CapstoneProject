from django.urls import path
from .views import CreateUserApi , LoginApi, UsersListApi

urlpatterns = [
    path("createUser", CreateUserApi.as_view()),
    path("login", LoginApi.as_view()),
    path("users" , UsersListApi.as_view())
]
