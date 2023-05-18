from rest_framework import serializers
from .models import User, Course, CourseRelationShip, Student, Section, Major, Availability, Doctor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email',
                  'password', 'isChaiperson', "username"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'subject', 'courseNumber', 'title',
                  'creditsNumber']


class CourseRelationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    mainCourse_id = serializers.IntegerField()
    secondCourse_id = serializers.IntegerField()
    isPrerequisite = serializers.BooleanField()

    def create(self, validated_data):
        main_course_id = validated_data.pop('mainCourse_id')
        instance = CourseRelationShip(mainCourse_id=main_course_id, **validated_data)
        instance.save()
        return instance


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'takenCredits', 'remainingCredits', 'courses', 'campus', 'major']


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'campus', 'numOfStudents', 'numOfSections', 'course', 'capacity']


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ['id', 'title', 'credits', 'courses']


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id' , 'name', 'title', 'courses', 'availability']


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'day', 'start_time', "end_time"]
