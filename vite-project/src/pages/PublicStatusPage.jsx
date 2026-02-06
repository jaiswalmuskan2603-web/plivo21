// src/pages/PublicStatusPage.jsx
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export default function PublicStatusPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const DUMMY_SERVICES = [
        {
            id: 1,
            name: "Website",
            description: "Public-facing web application",
            status: "Operational",
            updated_at: "2026-02-05T10:30:00Z",
        },
        {
            id: 2,
            name: "API",
            description: "Core backend services",
            status: "Degraded Performance",
            updated_at: "2026-02-05T10:15:00Z",
        },
   ]
    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setServices(DUMMY_SERVICES);
            setLoading(false);
        }, 800); // simulate network delay

        return () => clearTimeout(timer);


        // fetch("http://localhost:8000/api/services/")
        // .then((res) => {
        //     if (!res.ok) throw new Error("Failed to fetch services");
        //     return res.json();
        // })
        // .then((data) => setServices(data))
        // .catch((err) => setError(err.message))
        // .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
            <header className="mb-6">
            <h1 className="text-3xl font-bold">System Status</h1>
            <p className="text-gray-600">
                Current status of all services
            </p>
            </header>

            {loading && <p>Loading services...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="space-y-4">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
            </div>
        </div>
        </div>
    );
    }
