from django.urls import path
from .views import index, subscribe_view, message_view
urlpatterns = [
    # path('',IndexView.as_view(), name='index'),
    path('',index, name='index'),
    path('subscribe', subscribe_view, name='subscribe'),
    path('message', message_view, name='message'),
]
