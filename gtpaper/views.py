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
"""

# Or use client side authentication
