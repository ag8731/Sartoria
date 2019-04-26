from api.models import Bin, Item, Tag
from api.serializers import BinSerializer, ItemSerializer, TagSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BinViewSet(ModelViewSet):
    queryset = Bin.objects.all()
    serializer_class = BinSerializer


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
