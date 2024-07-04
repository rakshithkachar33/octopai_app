from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authentication.views import UserViewSet, ExerciseViewSet, PositionViewSet, DesignationViewSet
from django.http import HttpResponse
from authentication.views import UserRegistrationView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'positions', PositionViewSet)
router.register(r'designations', DesignationViewSet)


def landing_page(request):
    return HttpResponse("Welcome to the Exercise App!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('', landing_page),
]
