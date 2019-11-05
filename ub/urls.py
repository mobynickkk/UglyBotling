from django.urls import path
from .views import sign_up, sign_in, create_bot, get_bots


urlpatterns = [
    path('signup/', sign_up),
    path('signin/', sign_in),
    path('create/', create_bot),
    path('bots/', get_bots)
]
