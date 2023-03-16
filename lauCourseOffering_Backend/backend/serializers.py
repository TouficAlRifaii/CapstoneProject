from rest_framework import serializers
from .models import User , Course , CourseRelationShip , Student


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
                  'creditsNumber', 'campus']
        
class CourseRelationSerializer(serializers.ModelSerializer):
    class Meta: 
        model= CourseRelationShip
        fields = ['id', 'mainCourse_id' , 'secondCourse_id' , 'isPrerequisite']

class StudentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Student
        fields = ['id' , 'takenCredits' , 'remainingCredits' , 'courses' ]