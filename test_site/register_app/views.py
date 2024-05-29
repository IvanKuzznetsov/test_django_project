from django.shortcuts import render


def register(request):
    print(request.POST)
    return render(request, "register_app/register.html")
