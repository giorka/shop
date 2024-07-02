from django.urls import path
from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [
    path('', cache_page(6 * (60 * 60))(views.ProductListAPIView.as_view())),
    path('order/', views.OrderCreateAPIView.as_view()),
    path('<str:pk>/', views.ProductRetrieveAPIView.as_view()),
]
