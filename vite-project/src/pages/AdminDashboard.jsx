// src/pages/AdminDashboard.jsx
import { useState } from "react";
import ServiceForm from "../components/ServiceForm";
import IncidentForm from "../components/IncidentForm";
import IncidentCard from "../components/IncidentCard";



export default function AdminDashboard() {

const INITIAL_SERVICES = [
  { id: 1, name: "Website", status: "Operational" },
  { id: 2, name: "API", status: "Degraded Performance" },
  { id: 3, name: "Database", status: "Major Outage" },
];

const INITIAL_INCIDENTS = [
  {
    id: 1,
    title: "API latency issues",
    status: "Investigating",
    services: [2],
    updates: ["We are investigating increased response times."],
  },
];
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);

  const addService = (service) => {
    setServices([...services, { ...service, id: Date.now() }]);
  };

  const createIncident = (incident) => {
    setIncidents([...incidents, { ...incident, id: Date.now() }]);
  };

  const resolveIncident = (id) => {
    setIncidents(
      incidents.map((i) =>
        i.id === id ? { ...i, status: "Resolved" } : i
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ServiceForm onSave={addService} />

        <ul className="space-y-2">
          {services.map((s) => (
            <li key={s.id} className="border p-3 rounded bg-white">
              {s.name} — <strong>{s.status}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Incidents</h2>
        <IncidentForm services={services} onCreate={createIncident} />

        <div className="space-y-3">
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
