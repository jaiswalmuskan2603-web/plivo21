import StatusBadge from "./StatusBadges";

export default function ServiceCard({ service }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg bg-white">
      <div>
        <h3 className="text-lg font-semibold">{service.name}</h3>
        {service.description && (
          <p className="text-sm text-gray-500">{service.description}</p>
        )}
      </div>

      <StatusBadge status={service.status} />
    </div>
  );
}