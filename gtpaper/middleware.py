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

        print("In Auth Middleware")

        return response
    return middleware
