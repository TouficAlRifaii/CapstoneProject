from django.contrib import admin
from backend.models import User, Course, CourseRelationShip , Student
# Register your models here.
admin.site.register(User)
admin.site.register(Course)
admin.site.register(CourseRelationShip)
admin.site.register(Student)