import json
from django.http import JsonResponse, HttpResponse, QueryDict
from django.shortcuts import render
from .forms import MessageForm, SubscriberForm
from django.core.mail import EmailMultiAlternatives
from portfolio_project.settings import EMAIL_HOST_USER
from django.template.loader import get_template
from .models import ContactDetail, Service, Project, Client, About, Subscriber


# Create your views here.

def index(request):

    context = {'about': About.objects.first(),
             'services': Service.objects.order_by('id').reverse()[:6],
             'projects': Project.objects.order_by('id').reverse()[:6],
             'clients': Client.objects.order_by('id').reverse()[:6],
             'contact': ContactDetail.objects.last()}

    return render(request, 'portfolio/index.html', context)


def subscribe_view(request):

    if request.method == 'POST':

        # get data sent in body of POST request and convert it into python dictionary
        data = json.loads(request.body)
        form = SubscriberForm(data)

        if form.is_valid():
            if not Subscriber.objects.filter(email=data['email']).exists():
                form.save()
                send_mail_to_subscriber(form)
                return JsonResponse({"success": "true", "message": "You are subscribed"})
            else:

                return JsonResponse({"success": "false", "message": "Already subscribed"})
        else:
            return JsonResponse({"success": "false", "message": "Invalid email."})
    else:
        return HttpResponse( "<h1>Your request can not be supported. STATUS CODE = 404</h1>")


def message_view(request):

    if request.method == 'POST':

        # get data sent in body of POST request and convert it into python dictionary
        data = json.loads(request.body)
        form = MessageForm(data)
        if form.is_valid():
            s = form.save()
            return JsonResponse({'success': 'true', 'message': "You'll be contacted soon."})
        else:
            return JsonResponse({'success': 'false', 'message': "Invalid Input."})
    else:
        return HttpResponse("<h1>Your request can not be supported. STATUS CODE = 404</h1>")


def send_mail_to_subscriber(form):
    subject = "Regarding newsletter"
    text_content = "Thanks for subscribing"
    temp = get_template("portfolio/subscribe.html")
    html_content = temp.render()
    msg = EmailMultiAlternatives(subject, text_content, EMAIL_HOST_USER, [form.cleaned_data['email']])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

