from api.models import Bin, Item, Tag
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.serializers import CharField, ModelSerializer, Serializer, ValidationError


class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginUserSerializer(Serializer):
    username = CharField()
    password = CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise ValidationError('Unable to log in with provided credentials.')


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class BinSerializer(ModelSerializer):
    class Meta:
        model = Bin
        fields = '__all__'


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ItemReadSerializer(ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Item
        fields = '__all__'
        depth = 1
