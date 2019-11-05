from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from json import loads, dumps
from .models import Profile
from tools.botconstructor import BotConstructor
from tools.botstation import BotStation


bot_station = BotStation()


@api_view(['POST'])
@csrf_exempt
def sign_up(request):
    from json import loads
    print(request.POST)
    data = loads(request.POST['data'])
    django_user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
    Profile.objects.create(user=django_user)
    token = Token.objects.create(user=django_user)
    return Response(token.key)


@api_view(['POST'])
@csrf_exempt
def sign_in(request):
    data = loads(request.POST['data'])
    user = authenticate(username=data['username'], password=data['password'])
    if user is not None:
        token = Token.objects.create(user=user)
        return Response(token.key)
    return Response('{error: "Wrong username or password"}')


def create_bot(request):
    data = loads(request.GET['data'])
    user = Token.objects.get(key=data['token']).user
    profile = Profile.objects.get(user=user)
    try:
        bots = loads(profile.bots)
    except TypeError:
        bots = {}
    bots[data['bot']['meta']['name']] = {
        'platforms': data['bot']['meta']['platforms'],
        'trigger_reply': data['bot']['trigger_reply']
    }
    profile.bots = dumps(bots)
    profile.save()
    bot_station.add(BotConstructor(data['bot']['meta']['name'], data['bot']['trigger_reply']))
    return HttpResponse("Success")


def get_bots(request):
    data = loads(request.GET['data'])
    user = Token.objects.get(key=data['token']).user
    profile = Profile.objects.get(user=user)
    bots = loads(profile.bots)
    response = []
    for key, value in bots.items():
        response.append({'bot': {
            'meta': {'name': key, 'platforms': value['platforms']},
            'trigger_reply': value['trigger_reply']
        }})
    return HttpResponse(dumps(response))



