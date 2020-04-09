from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    Must also create the token in the database on user creation

    in order to verify that tokens incoming from the front end later in our custom `auth_middleware`
    are actually correct. We are not simply using the tokens for api authentication,
    but authentication at all front end urls and the graphql endpoint as well.
    """
    if created:
        Token.objects.create(user=instance)
