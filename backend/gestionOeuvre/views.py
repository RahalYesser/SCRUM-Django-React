from django.shortcuts import render
from rest_framework import viewsets
from gestionOeuvre.models import Oeuvre
from gestionOeuvre.serializers import OeuvreSerializer

# Create your views here.
class OeuvreViewSet(viewsets.ModelViewSet):
    queryset = Oeuvre.objects.all()
    serializer_class = OeuvreSerializer
