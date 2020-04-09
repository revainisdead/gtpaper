from django.urls import include, path
from rest_framework import routers

from restful_api import views

from rest_framework.authtoken import views as auth_views


router = routers.DefaultRouter()
router.register("users", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("token-auth/", auth_views.obtain_auth_token),
]
