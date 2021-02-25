from django.forms import ModelForm
from .models import Message, Subscriber


class MessageForm(ModelForm):

    class Meta:
        model = Message
        fields = ['name', 'email', 'phone', 'message']


class SubscriberForm(ModelForm):

    class Meta:
        model = Subscriber
        fields =['email']
