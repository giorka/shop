from . import views

from django.urls import path

urlpatterns = [
    path('', views.ProductListAPIView.as_view()),
    path('order/', views.OrderListCreateAPIView.as_view()),
    path('<str:pk>/', views.ProductRetrieveAPIView.as_view()),
]
