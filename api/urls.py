from django.urls import include, path
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'bins', views.BinViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'items', views.ItemViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.UserRegistration.as_view()),
    path('auth/login/', views.UserLogin.as_view()),
]
