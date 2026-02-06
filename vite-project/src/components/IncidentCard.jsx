// src/components/IncidentCard.jsx
export default function IncidentCard({ incident, onResolve }) {
  return (
    <div className="border rounded p-4 bg-white">
      <h4 className="font-semibold">{incident.title}</h4>
      <p className="text-sm text-gray-600">Status: {incident.status}</p>

      <ul className="text-sm mt-2 list-disc pl-4">
        {incident.updates.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>

      {incident.status !== "Resolved" && (
        <button
          onClick={() => onResolve(incident.id)}
          className="mt-3 text-sm text-green-700"
        >
          Mark as resolved
        </button>
      )}
    </div>
  );
}
