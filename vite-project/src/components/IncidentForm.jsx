// src/components/IncidentForm.jsx
import { useState } from "react";

export default function IncidentForm({ services, onCreate }) {
  const [title, setTitle] = useState("");
  const [serviceId, setServiceId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title,
      status: "Investigating",
      services: [Number(serviceId)],
      updates: ["Incident created."],
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="Incident title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="border p-2 rounded w-full"
        onChange={(e) => setServiceId(e.target.value)}
      >
        {/* <option value="">Affected service</option> */}
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Create Incident
      </button>
    </form>
  );
}
