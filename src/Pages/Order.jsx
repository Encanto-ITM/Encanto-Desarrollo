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

    const handleOrder = (serviceId) => {
        console.log(`Ordenando servicio con ID: ${serviceId}`);
        // Lógica adicional para manejar la orden
    };

    return (
        <>
            <Nav />
            <div className='p-6'> 
                <div className="text-center w-full p-10 font-bold">
                    <h1 className="text-2xl md:text-5xl">
                        Reserva tu cita para obtener <br />
                        una <span className="text-purple">Belleza</span> brillante
                    </h1>
                    {service && (
                        <h2 className="text-2xl md:text-4xl mt-6">
                           {service.name}
                        </h2>
                    )}
                </div>

                {loading && <p className="text-center">Cargando servicio...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                
                {service && (
                    <div className="flex flex-col md:flex-row gap-4 p-10">
                        <div className="flex flex-col gap-4 w-full md:w-1/3">
                            <ServiceCard serviceName={service.name} imgName="identificador" />
                            <ServiceCard serviceName={service.aprox_time} imgName="identificador" />
                        </div>
                        
                        <div className="w-full md:w-2/3 bg-purple flex items-center justify-center p-4 rounded-xl">
                            <Calendario />
                        </div>
                    </div>
                )}

                {service && (
                    <div className="flex justify-center mt-6">
                        <h1 className="font-bold">Precio del servicio: ₡{service.price}</h1>
                    </div>
                )}
                
                <div className="flex justify-center mt-10 mb-20">
                    <button 
                        className="font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/3 h-12 rounded-xl mt-3"
                        onClick={() => handleOrder(service.id)}
                        disabled={loading} // Deshabilitar mientras carga
                    >
                        Completar Orden
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
