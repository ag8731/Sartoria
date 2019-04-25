from api.models import Bin, Item, Tag
from django.contrib.auth.models import User
from dynamic_rest.serializers import DynamicModelSerializer


class UserSerializer(DynamicModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BinSerializer(DynamicModelSerializer):
    class Meta:
        model = Bin
        fields = '__all__'


class TagSerializer(DynamicModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ItemSerializer(DynamicModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
