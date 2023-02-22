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
    subject = models.CharField(max_length=255)
    courseNumber  = models.CharField(max_length=5)
    title = models.CharField(max_length=255)
    creditsNumber = models.IntegerField()
    campus = models.IntegerField()
    prerequisites = models.ManyToManyField('self' , blank=True)
    corequisites = models.ManyToManyField('self' , blank=True)


