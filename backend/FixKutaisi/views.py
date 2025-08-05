from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import User
from django.contrib.auth import authenticate, login, logout


# Create your views here.
def index(request):
    return render(request, 'home.html', {
        'user': request.user
    })


def register(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']
        user = User.objects.create_user(name, email, password)
        user.save()
        return HttpResponseRedirect(reverse('login'))

    return render(request, 'signup.html', {
        'user': request.user
    })


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
    return render(request, 'login.html', {
        'user': request.user
    })


def forgot(request):
    return render(request, 'forgotpassword.html')


def contact(request):
    return render(request, 'contact.html')
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))