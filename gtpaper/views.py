"""
from django.contrib.auth import authenticate, login

def login_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        pass
    else:
        # Return an 'invalid login' error message.
        pass

# set settings.LOGIN_URL (/accounts/login)
@login_required
def other_view(request):
    pass

# Or use client side authentication
"""
import os

from django.http import HttpResponse

from django.conf import settings

file_dir = os.path.dirname(os.path.abspath(__file__))

# This dir is local to the project.
#if settings.DEBUG:
#react_dir_index = os.path.join("../client/public/", "index.html")
#else:
react_dir_index = os.path.join(file_dir, "../client/build/", "index.html")

def index(request):
    try:
        with open(react_dir_index, "r") as f:
            #print("Found index.html")
            print(f.read())
            return HttpResponse(f.read())

            #import json
            #from django.http import JsonResponse
            #test = {"data": {"test": "testone"}}
            #return JsonResponse(test)


    except FileNotFoundError:
        return HttpResponse("Can't load index.html from {}".format(react_dir_index, status=501))
