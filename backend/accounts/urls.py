from django.urls import path
from .views import (
    RegisterView, LoginView,
    RegisterStudentView, RegisterAdminView,
    LoginStudentView, LoginAdminView,
    GoogleLoginView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/student/', RegisterStudentView.as_view(), name='register-student'),
    path('register/admin/', RegisterAdminView.as_view(), name='register-admin'),
    path('login/student/', LoginStudentView.as_view(), name='login-student'),
    path('login/admin/', LoginAdminView.as_view(), name='login-admin'),
    path('auth/google/', GoogleLoginView.as_view(), name='google-login'),
]
