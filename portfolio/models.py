from django.db import models
# Create your models here.


class Message(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.IntegerField()
    message = models.TextField()

    def __str__(self):
        return self.name


class Subscriber(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email


class About(models.Model):
    description = models.TextField()

    def __str__(self):
        return 'About company'


class Service(models.Model):
    image = models.ImageField(upload_to= 'service_images')
    title = models.CharField(max_length= 255)

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length= 255)
    image = models.ImageField(upload_to= 'project_images')
    description = models.TextField()

    def __str__(self):
        return self.title


class Client(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to= 'client_logos')

    def __str__(self):
        return self.title


class ContactDetail(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.email