from api.models import Bin, Item, Tag
from api.serializers import BinSerializer, ItemSerializer, TagSerializer, UserSerializer
from django.contrib.auth.models import User
from dynamic_rest.viewsets import DynamicModelViewSet


class UserViewSet(DynamicModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BinViewSet(DynamicModelViewSet):
    queryset = Bin.objects.all()
    serializer_class = BinSerializer


class TagViewSet(DynamicModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ItemViewSet(DynamicModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
