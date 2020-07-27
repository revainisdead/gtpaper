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

            # XXX This line solved a previous problem when the header is not found.
            return response

        print("original Auth header: {}".format(auth_header))
        token = auth_header.split(" ")[1]

        db_tokens = Token.objects.all()

        user = None
        print("DEBUG: Token from front end {}".format(token))
        for token_obj in db_tokens:
            if token_obj.key == token:
                pk = token_obj.user_id

                user = User.objects.filter(id=pk)[0]

        if user:
            # Yes, authenticated users have their Django user added into the response
            # for views. How this affects the project depends, currently the project
            # uses mainly react router for routing, so it routes urls in the front
            # end, so authentication for those urls needs to happen there. This is for
            # server side urls, which there is not many of, but there is as of writing:
            # 1. graphql
            # 2. api urls
            # 3. django admin

            response.user = user
            print("DEBUG: User authenticated --> {}".format(user.username))
        else:
            # Permission denied.
            # Token from client does not match the token associated with the user in the database.
            print('render 403 forbidden page')

        return response
    return middleware
