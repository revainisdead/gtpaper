from django.urls import include, path
#from django.views.decorators.csrf import csrf_exempt
#from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import routers
from rest_framework.authtoken import views as auth_views

from restful_api import views



router = routers.DefaultRouter()
router.register("users", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    #path("token-auth/", csrf_exempt(auth_views.obtain_auth_token)),
    #path("token-auth/", ensure_csrf_cookie(auth_views.obtain_auth_token)),
    path("token-auth/", auth_views.obtain_auth_token),
]
