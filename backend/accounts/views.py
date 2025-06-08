from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterStudentView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['is_student'] = True
        data['is_admin'] = False
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Student registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterAdminView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['is_student'] = False
        data['is_admin'] = True
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')

        user = authenticate(username=email, password=password)

        if user is not None:
            if role == 'student' and not user.is_student:
                return Response({'detail': 'User is not a student.'}, status=status.HTTP_401_UNAUTHORIZED)
            if role == 'admin' and not user.is_admin:
                return Response({'detail': 'User is not an admin.'}, status=status.HTTP_401_UNAUTHORIZED)
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username,
                    'email': user.email,
                    'role': role
                }
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LoginStudentView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user and user.is_student:
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username,
                    'email': user.email,
                    'role': 'student'
                }
            })
        return Response({'detail': 'Invalid credentials or not a student'}, status=status.HTTP_401_UNAUTHORIZED)

class LoginAdminView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user and user.is_admin:
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username,
                    'email': user.email,
                    'role': 'admin'
                }
            })
        return Response({'detail': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)

class GoogleLoginView(APIView):
    def post(self, request):
        credential = request.data.get('credential')
        role = request.data.get('role')

        if not credential or not role:
            return Response({'detail': 'Credential and role are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            id_info = id_token.verify_oauth2_token(credential, requests.Request(), settings.GOOGLE_OAUTH2_CLIENT_ID)

            email = id_info.get('email')
            first_name = id_info.get('given_name', '')
            last_name = id_info.get('family_name', '')
            username = email.split('@')[0] # Using email prefix as username for simplicity

            if not email:
                return Response({'detail': 'Google token did not contain an email.'}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=email)

            if created:
                user.username = username
                user.first_name = first_name
                user.last_name = last_name
                user.set_unusable_password() # Google authenticated users don't need a password
                if role == 'student':
                    user.is_student = True
                elif role == 'admin':
                    user.is_admin = True
                user.save()

            if (role == 'student' and not user.is_student) or \
               (role == 'admin' and not user.is_admin):
                return Response({'detail': f'User is not registered as {role}.'}, status=status.HTTP_401_UNAUTHORIZED)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username,
                    'email': user.email,
                    'role': role
                }
            })

        except ValueError:
            return Response({'detail': 'Invalid Google token.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
