from api.models import Bin, Item, Tag
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class BinSerializer(ModelSerializer):
    class Meta:
        model = Bin
        fields = '__all__'


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ItemSerializer(ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Item
        fields = '__all__'
        depth = 1
