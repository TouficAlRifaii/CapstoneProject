from django.contrib import admin
from backend.models import User, Course, CourseRelationShip, Student
# Register your models here.
from django.contrib import admin
from .models import CourseRelationShip

class CourseRelationShipAdmin(admin.ModelAdmin):
    list_display = ('mainCourse', 'secondCourse', 'isPrerequisite')
    list_filter = ('isPrerequisite',)
    search_fields = ('mainCourse__title', 'secondCourse__title')

admin.site.register(CourseRelationShip, CourseRelationShipAdmin)
admin.site.register(User)
admin.site.register(Course)
# admin.site.register(CourseRelationShip)
admin.site.register(Student)