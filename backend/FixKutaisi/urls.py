from django.urls import path
from . import views
urlpatterns=[
    path("", views.index, name="index"),
    path('register', views.register, name="register"),
    path('login', views.login_view, name="login"),
    path('forgot_password', views.forgot, name="forgot"),
    path('contact', views.contact, name="contact"),
    path('logout', views.logout_view, name="logout"),

]