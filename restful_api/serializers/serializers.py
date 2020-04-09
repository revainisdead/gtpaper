"""
Hyperlinked vs Default

ModelSerializer: Will put the pk in data (2) --> { "pk": 2 }
HyperlinkedModelSerializer: Will put the url with pk in data --> { "pk": "http://127.0.0.1:3000/users/2" }

"""

from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
