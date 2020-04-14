from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token


def cors_headers_middleware(get_response):
    """
    Headers to include in the server's reponse to enable CORS.

    origin: Note that localhost is not allowed by chrome as a value for "Access-Control-Allow-Origin"
    methods: OPTIONS here allows pre-flight requests
    headers: Client must include one of these
    credentials: Permits the client to attach cookies to its requests, use with fetch option "credentials": "include"

    """
    def middleware(request):
        response = get_response(request)

        # If cors is enabled (see fetchOptions in client), these headers are needed.
        response["Access-Control-Allow-Origin"] = "*" # replace with external url
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, OPTIONS, DELETE, HEAD"
        response["Access-Control-Allow-Headers"] = "Content-Type, X-CSRFToken, Origin, Authorization, User-Agent, x-requested-with, accept"
        response["Access-Control-Allow-Credentials"] = "true"

        return response
    return middleware


def auth_middleware(get_response):
    def middleware(request):
        response = get_response(request)

        # Debug
        #print("AAAA", { k: v for k, v in request.META.items() if k.startswith("HTTP_") })

        try:
            auth_header = request.META["HTTP_AUTHORIZATION"]

        except Exception as e:
            print("Authorization header not found. {}".format(e))
            # XXX !!!!!!!!!!!!!
            return response

        token = auth_header.split(" ")[1]

        db_tokens = Token.objects.all()


        print('auth_header', auth_header)
        print('token', token)
        print('type of token', type(token))

        user = None
        print("DEBUG: Token from front end {}".format(token))
        for token_obj in db_tokens:
            print(token_obj)
            print(token_obj.key)
            if token_obj.key == token:
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
