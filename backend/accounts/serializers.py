from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_student', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data.get('is_student', False) and data.get('is_admin', False):
            raise serializers.ValidationError('User cannot be both student and admin.')
        if not data.get('is_student', False) and not data.get('is_admin', False):
            raise serializers.ValidationError('User must be either student or admin.')
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_student=validated_data.get('is_student', False),
            is_admin=validated_data.get('is_admin', False)
        )
        return user
