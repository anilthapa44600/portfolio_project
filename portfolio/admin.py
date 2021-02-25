from django.contrib import admin
from .models import (Message,
    Subscriber,
    ContactDetail,
    Service,
    Project,
    About,
    Client)


# Register your models here.
admin.site.register(Message)
admin.site.register(Subscriber)
admin.site.register(ContactDetail)
admin.site.register(Service)
admin.site.register(Project)
admin.site.register(About)
admin.site.register(Client)