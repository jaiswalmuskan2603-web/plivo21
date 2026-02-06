from django.urls import path
from home2.views import (
    admin_login,
    admin_service,
    public_services,
    incidents,
    resolve_incident
)

urlpatterns = [
    path("admin/login/", admin_login),
    path("public/services/", public_services),
    # Admin CRUD (single function)
    path("admin/services/", admin_service),            # POST
    path("admin/services/<int:pk>/", admin_service),   # PUT, DELETE
    path("incidents/", incidents),
    path("incidents/<int:pk>/", resolve_incident),
]
