from django.db import models
from django.contrib.auth.models import AbstractUser


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
    substitutes = models.ManyToManyField("backend.Course", blank=True)

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
    major = models.ForeignKey("backend.Major", on_delete=models.CASCADE)
    campus = models.CharField(max_length=6)
    courses = models.ManyToManyField("backend.Course", blank=True)


class Major(models.Model):
    title = models.CharField(max_length=255, unique=True)
    credits = models.IntegerField()
    courses = models.ManyToManyField(Course, related_name="majors", blank=True)

    def __str__(self):
        return f"{self.title}"


class Section(models.Model):
    campus = models.CharField(max_length=7)
    numOfStudents = models.IntegerField()
    numOfSections = models.IntegerField()
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE)
    capacity = models.IntegerField(default=40)


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    campus = models.IntegerField()
    courses = models.ManyToManyField('Course', related_name='doctors', blank=True)
    availability = models.ManyToManyField('Availability', related_name='doctors', blank=True)


    def __str__(self):
        return f"{self.name}"


class Availability(models.Model):
    days = models.CharField(max_length=5)
    start = models.CharField(max_length=255)
    end = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.days}: {self.start} ; {self.end}"


class StudyPlan(models.Model):
    major = models.ForeignKey("backend.Major", on_delete=models.CASCADE)
    firstYear = models.ManyToManyField("Course", blank=True, related_name="firstYearCourses")
    secondYear = models.ManyToManyField("Course", blank=True, related_name="secondYearCourses")
    thirdYear = models.ManyToManyField("Course", blank=True, related_name="thirdYearCourses")
