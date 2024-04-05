from django.urls import include, path

urlpatterns: tuple = (
    path('auth/', include('v1__auth.urls')),

)
