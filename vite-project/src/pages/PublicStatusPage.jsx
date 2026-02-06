// src/pages/PublicStatusPage.jsx
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export default function PublicStatusPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        setLoading(true);

        fetch("http://127.0.0.1:8000/api/public/services/")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch services");
            return res.json();
        })
        
        .then((data) => setServices(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
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
