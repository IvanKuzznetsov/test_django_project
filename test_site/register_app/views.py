from django.shortcuts import render


def register(request):
    return render(request, "register_app/register.html")
