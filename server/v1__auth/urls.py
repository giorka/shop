from django.urls import path
from djoser import views as djoser

from . import views

urlpatterns = (
    path('register/', views.UserCreateAPIView.as_view()),
    path('login/', djoser.TokenCreateView.as_view()),
    path('logout/', djoser.TokenDestroyView.as_view()),
    path('cart/', views.CartListCreateAPIView.as_view()),
    path('cart/<str:identifier>/', views.CartDestroyAPIView.as_view()),
)
