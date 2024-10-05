from django.urls import include, path

urlpatterns = (
    path('auth/', include('v1__auth.urls')),
    path('products/', include('v1__products.urls')),
)
