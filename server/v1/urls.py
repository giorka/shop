from django.urls import include, path

urlpatterns = (
    path('products/', include('v1__products.urls')),
    path('auth/', include('v1__auth.urls')),
)
