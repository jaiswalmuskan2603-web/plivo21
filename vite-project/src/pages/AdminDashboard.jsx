import { useEffect, useState } from "react";
import ServiceForm from "../components/ServiceForm";
import IncidentForm from "../components/IncidentForm";
import IncidentCard from "../components/IncidentCard";

const API_BASE = "http://127.0.0.1:8000/api";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchServices();
    fetchIncidents();
  }, []);

  const fetchServices = async () => {
    const res = await fetch(`${API_BASE}/public/services/`);
    const data = await res.json();
    setServices(data);
  };

  const fetchIncidents = async () => {
    const res = await fetch(`${API_BASE}/incidents/`);
    const data = await res.json();
    setIncidents(data);
  };

  /* ---------------- SERVICES ---------------- */

  const addService = async (service) => {
    const res = await fetch(`${API_BASE}/admin/services/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });

    const newService = await res.json();
    setServices((prev) => [...prev, newService]);
  };

  const updateService = async (id, updatedFields) => {
    const res = await fetch(`${API_BASE}/admin/services/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    const updatedService = await res.json();

    setServices((prev) =>
      prev.map((s) => (s.id === id ? updatedService : s))
    );
  };

  const deleteService = async (id) => {
    await fetch(`${API_BASE}/admin/services/${id}/`, {
      method: "DELETE",
    });

    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  /* ---------------- INCIDENTS ---------------- */

  const createIncident = async (incident) => {
    const res = await fetch(`${API_BASE}/incidents/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incident),
    });

    const newIncident = await res.json();
    setIncidents((prev) => [...prev, newIncident]);
  };

  const resolveIncident = async (id) => {
    const res = await fetch(`${API_BASE}/incidents/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Resolved" }),
    });

    const updatedIncident = await res.json();

    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? updatedIncident : i))
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* -------- SERVICES -------- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ServiceForm onSave={addService} />

        <ul className="space-y-2 mt-4">
          {services.map((s) => (
            <li
              key={s.id}
              className="border p-3 rounded bg-white flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">{s.status}</div>
              </div>

              <div className="flex gap-2 items-center">
                <select
                  value={s.status}
                  onChange={(e) =>
                    updateService(s.id, { status: e.target.value })
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option>Operational</option>
                  <option>Degraded Performance</option>
                  <option>Partial Outage</option>
                  <option>Major Outage</option>
                </select>

                <button
                  onClick={() => deleteService(s.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* -------- INCIDENTS -------- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Incidents</h2>
        <IncidentForm services={services} onCreate={createIncident} />

        <div className="space-y-3 mt-4">
          {incidents.map((i) => (
            <IncidentCard
              key={i.id}
              incident={i}
              onResolve={resolveIncident}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
