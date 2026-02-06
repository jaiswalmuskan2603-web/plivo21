// src/components/ServiceForm.jsx
import { useState } from "react";

const STATUSES = [
  "Operational",
  "Degraded Performance",
  "Partial Outage",
  "Major Outage",
];

export default function ServiceForm({ onSave }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Operational");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, status });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Service name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button className="bg-black text-white px-4 rounded">Add</button>
    </form>
  );
}
