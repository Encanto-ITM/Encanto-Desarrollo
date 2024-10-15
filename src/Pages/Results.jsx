import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search } from "../Components/home-components/Search";
import { Nav } from '../Components/Activity/Nav.jsx';
import { TypeServices } from "../Components/home-components/TypeServices.jsx";
import Footer from "../Components/Activity/Footer.jsx";

export function Results() {
    const { id } = useParams(); 
    const [services, setServices] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
       
        setLoading(true);
        setError(null);

        const fetchServices = async () => {
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${id}/filtertype`); 
                 
                if (!response.ok) {
                    throw new Error('No existen servicios para esta categoria');
                }
                const data = await response.json();
                setServices(data.data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchServices();
    }, [id]); 

    return (
        <div>
            <Nav />
            <Search />
            <TypeServices />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Results</h1>
                {loading && <p className="text-center">Cargando servicios...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && services.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => (
                            <div key={service.id} className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
                                    <p className="font-bold text-gray-700 mb-2">{service.schedule}</p>
                                    <p className=" text-lg">{service.details}</p>
                                    <p className="font-bold text-lg">${service.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
