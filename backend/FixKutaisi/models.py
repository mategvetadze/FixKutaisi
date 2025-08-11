from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=30)


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    content = models.TextField()


class Problem(models.Model):
    CATEGORY_CHOICES = [
        ('road', 'Road'),
        ('water', 'Water'),
        ('lighting', 'Lighting'),
        ('waste', 'Waste'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    reporter = models.CharField(max_length=100)
    is_anonymous = models.BooleanField(default=False)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date_created = models.DateTimeField(default=timezone.now)
    image = models.TextField(blank=True, null=True)
