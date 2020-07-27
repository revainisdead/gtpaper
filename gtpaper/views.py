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


"""
def index(request):
    # The client dir is local to the project.
    if settings.DEBUG:
        index_loc = os.path.join(settings.BASE_DIR, "client/build/", "index.html")
    else:
        index_loc = os.path.join(settings.STATIC_ROOT, "index.html")

    try:
        with open(index_loc, "r") as f:
            return HttpResponse(f.read())

            #import json
            #from django.http import JsonResponse
            #test = {"data": {"test": "testone"}}
            #return JsonResponse(test)


    except FileNotFoundError:
        return HttpResponse("Can't load index.html from {}".format(index_loc, status=501))
"""
