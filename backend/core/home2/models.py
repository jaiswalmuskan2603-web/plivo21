# core/models.py
from django.db import models

class Service(models.Model):
    STATUS_CHOICES = [
        ("Operational", "Operational"),
        ("Degraded Performance", "Degraded Performance"),
        ("Partial Outage", "Partial Outage"),
        ("Major Outage", "Major Outage"),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Operationall",
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class AdminUser(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # hashed later
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    

class Incident(models.Model):
    INCIDENT_STATUS = [
        ("Investigating", "Investigating"),
        ("Identified", "Identified"),
        ("Monitoring", "Monitoring"),
        ("Resolved", "Resolved"),
    ]

    title = models.CharField(max_length=200)
    status = models.CharField(
        max_length=20,
        choices=INCIDENT_STATUS,
        default="Investigating",
    )

    services = models.ManyToManyField(Service, related_name="incidents")
    updates = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

