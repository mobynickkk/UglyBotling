from django.contrib import admin
from django.urls import path, include
from ub.views import sign_up

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ub.urls'))
]
