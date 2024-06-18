from django.urls import include, path

urlpatterns = (
    path('products/', include('v1__products.urls')),
)
