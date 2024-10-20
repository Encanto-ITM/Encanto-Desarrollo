import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from "../Components/home-components/Search";
import { Nav } from '../Components/Activity/Nav.jsx';
import { TypeServices } from "../Components/home-components/TypeServices.jsx";
import Footer from "../Components/Activity/Footer.jsx";

export function Results() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [services, setServices] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${id}/filtertype`); 
                const data = await response.json();
                setServices(data.data); 
            } catch (err) {
                setError(err.message); 
            }
        };

        fetchServices();
    }, [id]); 

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOrder = (id) => {
        navigate(`/order/${id}`); 
    };

    return (
        <div>
            <Nav />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TypeServices />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Results</h1>
                {loading && <p className="text-center">Cargando servicios...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map(service => (
                            <div key={service.id} className="bg-white shadow-lg rounded-md p-4 flex flex-col">
                                <img
                                    src={service.imageUrl} 
                                    alt={service.name}
                                    className="w-full h-48 object-cover rounded-t-md"
                                />
                                <h2 className="text-xl font-semibold mt-2">{service.name}</h2>
                                <h2 className="text-xl font-semibold mt-2">₡{service.price}</h2>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {service.details} 
                                </p>
                                <button
                                    className="mt-4 bg-purple text-white rounded-md px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-black"
                                    onClick={() => handleOrder(service.id)} 
                                >
                                    Order Now
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No se encontraron servicios que coincidan con su búsqueda.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
