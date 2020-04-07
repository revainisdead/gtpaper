def allow_headers_middleware(get_response):
    def middleware(request):
        response = get_response(request)

        access_control_allow = "Access-Control-Allow"
        #response[access_control_allow + "-Origin"] = "http://localhost:3000"
        response[access_control_allow + "-Origin"] = "*"
        response[access_control_allow + "-Methods"] = "GET, POST, PUT, PATCH, OPTIONS, DELETE, HEAD"
        response[access_control_allow + "-Headers"] = "Content-Type, X-CSRFToken, Origin, Authorization, User-Agent, x-requested-with, accept"
        # Permits the client to attach cookies to its requests
        response[access_control_allow + "-Credentials"] = "true"

        return response
    return middleware
