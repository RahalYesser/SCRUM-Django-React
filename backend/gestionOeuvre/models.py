from django.db import models

# Create your models here.
class Oeuvre(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date_creation = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='oeuvres/', null=True, blank=True)

    def __str__(self):
        return self.titre