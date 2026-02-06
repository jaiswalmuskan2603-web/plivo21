const STATUS_STYLES = {
    Operational: "bg-green-100 text-green-800",
    "Degraded Performance": "bg-yellow-100 text-yellow-800",
    "Partial Outage": "bg-orange-100 text-orange-800",
    "Major Outage": "bg-red-100 text-red-800",
    };

    export default function StatusBadge({ status }) {
    return (
        <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
            STATUS_STYLES[status] || "bg-gray-100 text-gray-800"
        }`}
        >
        {status}
        </span>
    );
    }