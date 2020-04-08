"""
Django settings for gtpaper project.

Generated by 'django-admin startproject' using Django 3.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_secret_key():
    SECRET_LOCATION = "gtpaper"
    SECRET_FILE = "secret.key"

    try:
        with open(os.path.join(SECRET_LOCATION, SECRET_FILE), "r") as f:
            return f.read().rstrip()
    except (FileNotFoundError, PermissionError) as e:
        print("Error: must put secret file in the correct secret location. {}".format(e))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret_key()

# SECURITY WARNING: don't run with debug turned on in production!
PROD = os.environ.get("GTPAPER_PROD", False)
if PROD:
    print("In Production")
    DEBUG = False
else:
    print("In Development")
    DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'gtpaper',
    'restful_api',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'graphene_django',
]

GRAPHENE = {
    "SCHEMA": "gtpaper.schema.schema",
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'gtpaper.middleware.allow_headers_middleware',
    'gtpaper.middleware.auth_middleware',
]

ROOT_URLCONF = 'gtpaper.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gtpaper.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'gtpaper',
        'USER': 'gtpaper',
        'PASSWORD': 'gtpaper',
        'HOST': 'localhost',
        'POST': '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#CSRF_COOKIE_NAME = "csrftoken"
CSRF_COOKIE_SECURE = False # not https

# To extend default user model
#AUTH_USER_MODEL = gtpaper.models.User

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

# For Production this must have a value
settings_dir = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(settings_dir, "..", "static") # collectstatic drops files at this location

#APPEND_SLASH = False

