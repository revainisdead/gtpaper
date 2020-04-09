from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token


def allow_headers_middleware(get_response):
    def middleware(request):
        response = get_response(request)

        # Note: to prove a point, I could comment this stuff out,
        # because it's not being used. Currently, these cors
        # access allow headers are not needed because the back end
        # and front end are of the same origin, but if I use an external
        # api, these headers will come in handy, see keep them in.
        access_control_allow = "Access-Control-Allow"
        response[access_control_allow + "-Origin"] = "*" # replace with external url
        response[access_control_allow + "-Methods"] = "GET, POST, PUT, PATCH, OPTIONS, DELETE, HEAD"
        response[access_control_allow + "-Headers"] = "Content-Type, X-CSRFToken, Origin, Authorization, User-Agent, x-requested-with, accept"
        # Permits the client to attach cookies to its requests
        response[access_control_allow + "-Credentials"] = "true"

        return response
    return middleware


def auth_middleware(get_response):
    def middleware(request):
        response = get_response(request)

        try:
            auth_header = response["Authorization"]
        except Exception as e:
            print("Authorization header not found. {}".format(e))
            return

        token = auth_header.split(" ")[1]

        db_tokens = Token.objects.all()

        print(token)
        for db_token in db_tokens:
            print(db_token)
            print(db_token.token)
            if db_token.token == token:
                pk = db_token.id
                print(pk)

                user = User.objects.filter(id=pk)
                print("TEST", user)

        if user:
            response.user = user
        else:
            #return render404
            print('return 404')

        return response
    return middleware
