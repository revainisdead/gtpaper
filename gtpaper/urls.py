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

from django.views.decorators.csrf import csrf_exempt

from graphene_django.views import GraphQLView

# XXX Ignore migration warning: URL name 'url' isn't unique:
#
# Since admin urls are checked before the catch all (last url),
# this warning should be irrelevant.
urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    # These two must be last.
    url(r"^$", csrf_exempt(GraphQLView.as_view(graphiql=True))), # matches just an empty string
    url(r"^(?:.*)/?", admin.site.urls), # matches all urls
]
