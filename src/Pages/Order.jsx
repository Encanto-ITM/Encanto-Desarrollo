import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import ServiceCard from '../Components/UI/ServiceCard.jsx';
import { Calendario } from '../Components/UI/Calendario.jsx';

export function Order() {
    const { id } = useParams(); 
    const [service, setService] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${id}/`); 
                if (!response.ok) {
                    throw new Error('No existe un servicio para esta categoría');
                }
                const data = await response.json();

                if (data) {
                    setService(data); 
                } else {
                    throw new Error('La respuesta no contiene un servicio');
                }
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchService();
    }, [id]); 

    const handleOrder = (id) => {
        // Lógica para completar la orden
    };

    return (
        <>
            <Nav />
            <div className='p-4 max-w-2xl mx-auto'>
                <div className="text-center w-full p-4 font-bold">
                    <h1 className="text-2xl md:text-4xl text-gray-800">
                        Reserva tu cita para obtener <br />
                        una <span className="text-purple">Belleza</span> brillante
                    </h1>
                    {service && (
                        <h2 className="text-xl md:text-3xl mt-16 text-gray">
                           {service.name}
                        </h2>
                    )}
                </div>

                {loading && <p className="text-center text-gray-600">Cargando servicio...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                
                {service && (
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="w-full h-[77%] bg-purple flex items-center justify-center p-4 rounded-xl">
                            <Calendario />
                        </div>
                    </div>
                )}

                {service && (
                    <div className="flex flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <ServiceCard serviceName={service.name} imgName="identificador" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <ServiceCard serviceName={service.aprox_time} imgName="identificador" />
                        </div>
                    </div>
                )}

                {service && (
                    <div className="flex justify-center mt-4">
                        <h1 className="text-xl md:text-3xl mt-16 text-gray font-bold">Precio del servicio: ₡{service.price}</h1>
                    </div>
                )}
                
                <div className="flex justify-center mt-6 mb-20">
                    <button  
                        className=" font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/2 h-10 rounded-xl"
                        onClick={() => handleOrder(service.id)}
                        disabled={loading} 
                    >
                        Completar Orden
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

