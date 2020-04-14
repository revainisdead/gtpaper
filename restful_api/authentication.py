from rest_framework.authentication import SessionAuthentication


class CsrfExemptSessionAuth(SessionAuthentication):
    def enforce_csrf(self, request):
        """
        Overwirte this function to not enforce csrf for login view,
        they still need to provide a valid username and password to get
        a token.
        """
        return


class CsrfExemptTokenAuth(SessionAuthentication):
    def enforce_csrf(self, request):
        """
        Overwirte this function to not enforce csrf for login view,
        they still need to provide a valid username and password to get
        a token.
        """
        return
