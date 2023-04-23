from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    isChaiperson = models.BooleanField(default=False)


class Course(models.Model):
    class Meta:
        unique_together = ("subject", "courseNumber")

    subject = models.CharField(max_length=255)
    courseNumber = models.CharField(max_length=5)
    title = models.CharField(max_length=255)
    creditsNumber = models.IntegerField()
    # campus = models.IntegerField()

    def __str__(self):
        return f"{self.subject}{self.courseNumber}"


class CourseRelationShip(models.Model):
    mainCourse = models.ForeignKey(
        "backend.Course", on_delete=models.CASCADE, related_name="mainCourse")
    secondCourse = models.ForeignKey(
        "backend.Course", on_delete=models.CASCADE, related_name="secondCourse")
    # true if prerequisite and false if coreq
    isPrerequisite = models.BooleanField()


class Student(models.Model):
    takenCredits = models.IntegerField()
    remainingCredits = models.IntegerField()
    courses = models.ManyToManyField("backend.Course" ,blank=True)


class Section(models.Model):
    campus = models.CharField(max_length=7)
    numOfStudents = models.IntegerField()
    numOfSections = models.IntegerField()
    course =  models.ForeignKey(to=Course , on_delete=models.CASCADE)
