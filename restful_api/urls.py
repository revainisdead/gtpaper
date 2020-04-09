from django.urls import include, path
from rest_framework import routers

from restful_api import views

router = routers.DefaultRouter()
router.register("users", views.UserViewSet)

urlspatterns = [
    path('', include(routers.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
