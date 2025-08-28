import json
from pyexpat.errors import messages

from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Message, Problem
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


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
        user = User.objects.create_user(username=name,email=email,password=password)
        user.save()
        login(request, user)
        return HttpResponseRedirect(reverse('index'))

    return render(request, 'signup.html', {
        'user': request.user
    })


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        remember_me = request.POST.get('rememberMe')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if not remember_me:
                request.session.set_expiry(0)
            else:
                request.session.set_expiry(60 * 60 * 24 * 30)
            return HttpResponseRedirect(reverse('index'))
    return render(request, 'login.html', {
        'user': request.user
    })


def forgot(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    if request.method == 'POST':
        email = request.POST.get('email')
        if User.objects.filter(email=email).exists():
            request.session['allowed_once'] = True
            id = User.objects.get(email=email).id
            request.session['allowed_once'] = True

            return HttpResponseRedirect(reverse('new_password', args=[id]))
    return render(request, 'forgotpassword.html')


def new_password(request, id):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))

    if not request.session.get('allowed_once', False):
        return HttpResponseRedirect(reverse('index'))
    request.session['allowed_once'] = None
    if request.method == 'POST':
        new_password = request.POST.get('password')
        if new_password:
            user = User.objects.get(id=id)
            user.set_password(new_password)
            user.save()
            return HttpResponseRedirect(reverse('login'))
    return render(request, 'new_password.html')


@login_required
def contact(request):
    if request.method == 'POST':
        message = request.POST['message']
        Message.objects.create(sender=request.user, content=message)
    return render(request, 'contact.html', {
        'user': request.user
    })

@csrf_exempt
def api_problems(request):
    if request.method == 'GET':
        problems = Problem.objects.all()
        problems_data = []

        for problem in problems:
            problems_data.append({
                'id': problem.id,
                'title': problem.title,
                'description': problem.description,
                'category': problem.category,
                'reporter': problem.reporter,
                'isAnonymous': problem.is_anonymous,
                'location': {
                    'lat': problem.latitude,
                    'lng': problem.longitude
                },
                'date': problem.date_created.strftime('%Y-%m-%d'),
                'image': problem.image if problem.image else None
            })

        return JsonResponse(problems_data, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)

        # Extract location data
        location = data.get('location', {})

        # Create new problem
        problem = Problem.objects.create(
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category'),
            reporter=data.get('reporter', 'ანონიმი'),
            is_anonymous=data.get('isAnonymous', False),
            latitude=location.get('lat'),
            longitude=location.get('lng'),
            image=data.get('image')
        )

        # Return the created problem data
        response_data = {
            'id': problem.id,
            'title': problem.title,
            'description': problem.description,
            'category': problem.category,
            'reporter': problem.reporter,
            'isAnonymous': problem.is_anonymous,
            'location': {
                'lat': problem.latitude,
                'lng': problem.longitude
            },
            'date': problem.date_created.strftime('%Y-%m-%d'),
            'image': problem.image if problem.image else None
        }

        return JsonResponse(response_data, status=201)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))
