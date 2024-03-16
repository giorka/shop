from django.contrib import admin
from django.urls import include, path

django_urlpatterns = (
    path('admin/', admin.site.urls),
)

urlpatterns = (
    *django_urlpatterns,
    path('api/v1/', include('v1.urls')),

)
