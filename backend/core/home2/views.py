from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password

from .models import Service, Incident, AdminUser
from .serializers import ServiceSerializer, IncidentSerializer


@api_view(["POST"])
def admin_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        admin = AdminUser.objects.get(email=email)
        if check_password(password, admin.password):
            return Response({"message": "Login successful"})
        return Response({"error": "Invalid credentials"}, status=401)
    except AdminUser.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@api_view(["GET", "POST"])
def incidents(request):
    if request.method == "GET":
        incidents = Incident.objects.all()
        serializer = IncidentSerializer(incidents, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = IncidentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(["PUT"])
def resolve_incident(request, pk):
    incident = Incident.objects.get(id=pk)

    incident.status = "Resolved"

    # Optional but recommended: add an update entry
    incident.updates.append("Incident resolved.")
    incident.save()

    serializer = IncidentSerializer(incident)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def public_services(request):
    services = Service.objects.all().order_by("name")
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(["POST", "PUT", "DELETE"])
def admin_service(request, pk=None):
    # CREATE
    if request.method == "POST":
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # UPDATE
    if request.method == "PUT":
        if not pk:
            return Response(
                {"error": "Service ID required for update"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            service = Service.objects.get(id=pk)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=404)

        serializer = ServiceSerializer(service, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    # DELETE
    if request.method == "DELETE":
        if not pk:
            return Response(
                {"error": "Service ID required for delete"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            service = Service.objects.get(id=pk)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=404)

        service.delete()
        return Response(
            {"message": "Service deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


