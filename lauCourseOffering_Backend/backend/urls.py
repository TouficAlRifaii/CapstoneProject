from django.urls import path
from .views import CreateUserApi , LoginApi

urlpatterns = [
    path("createUser", CreateUserApi.as_view()),
    path("login", LoginApi.as_view())
]
