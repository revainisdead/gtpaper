def allow_headers_middleware(get_response):
    def middleware(request):
        access_control_allow = "Access-Control-Allow"
        response = get_response(request)

        response[access_control_allow + "-Origin"] = "http://localhost:3000"
        response[access_control_allow + "-Methods"] = "GET, POST, PUT, PATCH, OPTIONS, DELETE, HEAD"
        response[access_control_allow + "-Headers"] = "Content-Type, X-CSRFToken"
        response[access_control_allow + "-Credentials"] = "True"

        return response
    return middleware
