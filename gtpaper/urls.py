"""gtpaper URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.conf.urls import url
from django.urls import path
from django.utils.decorators import decorator_from_middleware

from graphene_django.views import GraphQLView

from gtpaper import views
from gtpaper.middleware import auth_middleware

# Add header based authentication via tokens to graphql
#auth_middleware_decorator = decorator_from_middleware(auth_middleware)
#   path("graphql/", auth_middleware_decorator(GraphQLView.as_view(graphiql=True))),


# XXX Ignore migration warning: URL name 'url' isn't unique:
#
# Since admin urls are checked before the catch all (last url),
# this warning should be irrelevant.
urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    url(r"^$", views.index), # matches the root
    url(r"^.*$", views.index), # matches all urls
]
