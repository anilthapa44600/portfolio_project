from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from .forms import MessageForm, SubscriberForm
from django.views.generic import TemplateView
from django.core.mail import EmailMultiAlternatives
from portfolio_project.settings import EMAIL_HOST_USER
from django.template.loader import get_template
from django.template import Context
from .models import ContactDetail, Service, Project, Client, About


# Create your views here.
# class IndexView(TemplateView):
#     template_name = 'portfolio/index.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['contact'] = ContactDetail.objects.last()
#         context['services'] = Service.objects.all()
#         context['projects'] = Project.objects.all()
#         context['clients'] = Client.objects.all()
#         context['about'] = About.objects.last()
#         return context
#     def get(self, request, *args, **kwargs):
#         pass
#
#     def post(self):
#         pass

def index(request):

    context = {'about': About.objects.first(),
             'services': Service.objects.order_by('id').reverse()[:6],
             'projects': Project.objects.order_by('id').reverse()[:6],
             'clients': Client.objects.order_by('id').reverse()[:6],
             'contact': ContactDetail.objects.last()}

    return render(request, 'portfolio/index.html', context)


# def save_form(request, model_form):
#     form = model_form(request.POST)
#     if form.is_valid():
#         form.save()
#         messages.success(request, "You are subscribed")


def subscribe_view(request):

    if request.method == 'POST' and request.is_ajax():
        # save_form(request, SubscriberForm)
        form = SubscriberForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'You are subscribed!!!!!!!'})
        else:
            return JsonResponse({'message': 'You are not subscribed!!!!!!!'})
    else:
        return HttpResponse("<h1>Your request can not be supported. STATUS CODE = 404</h1>")


def message_view(request):

    if request.method == 'POST' and request.is_ajax():
        # save_form(request,MessageForm)
        form = MessageForm(request.POST)
        if form.is_valid():
            s = form.save()
            return JsonResponse({'message': 'We received your message!'})
        else:
            return JsonResponse({'message': 'Something went wrong. Try again later.'})
    else:
        return HttpResponse("<h1>Your request can not be supported. STATUS CODE = 404</h1>")
