from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Customer, BaseUser, Rider, Restaurant
from main.models import Item
import json
from django.core.serializers import serialize
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from datetime import datetime

# Create your views here.
def home(request):
  return HttpResponse("Hello, world!")

@api_view(['POST'])
def login(request):
    print("login request ", request.data)
    try:
      user = BaseUser.authenticate_user(request.data['username'], request.data['ruolo'])
      print("login base user", user)
      if user:
        print("authenticated user\n", user.to_json())
        return JsonResponse(user.to_json(), status = 200)
      else:
        return HttpResponse({'User not found'}, status=404)
    except Exception as e:
        return HttpResponse({'Error authenticating user'}, status=500)
  
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        role = request.data.get('ruolo', None)
        if role not in ['cliente', 'ristorante', 'rider']:
            return Response({'error': 'Invalid role'}, status=400)
        user = BaseUser.create_user(role, **request.data)
        print(f"{role.capitalize()} JSON\n", user.to_json())
        return JsonResponse(user.to_json(), status=200)
  
@api_view(['GET','PUT'])
def balance(request, user_name, user_role):
  print("GET balance", request.data)
  if request.method == 'GET':
    try:
      user = BaseUser.get_user_by_role(user_role, user_name)
      return JsonResponse(user.balance, status = 200, safe= False)
    except Exception as e:
      return HttpResponse({'error':str(e)}, status = 500)
  if request.method == 'PUT':
    try:
      user = BaseUser.get_user_by_role(user_role, user_name)
      print("user balance\n", user.to_json())
      user.update_balance(request.data['balance'])
      return JsonResponse(user.to_json(), status = 200, safe = False)
    except Exception as e:
      return HttpResponse({'error':str(e)}, status = 500)

@api_view(['GET','PUT'])
def account(request, user_name, user_role):
  print("account user_name", user_name)
  if request.method == 'PUT':
    updatedUser = BaseUser.update_user(user_role,user_name, request.data)
    if updatedUser is not None:
       return JsonResponse(updatedUser.to_json(),status = 200, safe = False)
  elif request.method == 'GET':
    user = BaseUser.get_user_by_role(user_name, user_name)
    if user is not None:
      return user.to_json()