from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('register', views.register, name="register"),
    path('login', views.login_view, name="login"),
    path('forgot_password', views.forgot, name="forgot"),
    path('contact', views.contact, name="contact"),
    path('logout', views.logout_view, name="logout"),
    path('new_password/<int:id>',views.new_password, name="new_password"),
    path('api/problems', views.api_problems, name="api_problems"),
    path('create_user', views.create_user, name="create_user"),
]
