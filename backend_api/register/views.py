from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


@api_view(['POST'])
def register(request):
    print(request.data)
    return Response("Hello")
