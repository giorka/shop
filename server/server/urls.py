from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from server import settings

django_urlpatterns: tuple = (
    path('admin/', admin.site.urls),
)

urlpatterns: tuple = (
    *django_urlpatterns,
    path('api/v1/', include('v1.urls')),
)

urlpatterns += tuple(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))
