from django.conf import settings
from django.db import models


class Bin(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, null=False)
    description = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, null=False)
    description = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, null=False)
    description = models.CharField(max_length=512, null=True, blank=True)
    image = models.ImageField(upload_to='uploaded_image_data/')
    bin = models.ForeignKey(Bin, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.name
