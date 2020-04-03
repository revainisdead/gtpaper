"""
from django.db import models

# Model's form of required: blank=False
class User(models.Model):
    email = models.EmailField(max_length=100, unique=True, blank=False)
"""
