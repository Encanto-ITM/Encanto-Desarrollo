import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import ServiceCard from '../Components/UI/ServiceCard.jsx';
import { Calendario } from '../Components/UI/Calendario.jsx';
import { useCart } from '../Components/Cart/CartContext'; 

export function Order() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [service, setService] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null); 
    const [warningMessage, setWarningMessage] = useState(''); 

    const { addToCart } = useCart(); 

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
                setService(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchService();
    }, [id]); 

    const handleOrder = () => {
        if (service && selectedTime) {
            navigate(`/confirmation/${service.id}`, { state: { service, selectedTime } });
            setWarningMessage('');
        } else {
            setWarningMessage('Por favor, seleccione una hora presionando el botón OK antes de continuar.');
        }
    };

    const handleAddToCart = () => {
        if (service) {
            const serviceWithTime = {
                ...service,
                selectedTime: selectedTime, // Incluir el tiempo seleccionado
            };
            addToCart(serviceWithTime);
            setWarningMessage('Servicio agregado al carrito.');
        }
    };

    const handleDateChange = (newValue) => {
        setSelectedTime(newValue);
        setWarningMessage(''); 
    };

    return (
        <>
            <Nav />
            <div className='flex flex-col items-center p-4 max-w-6xl mx-auto'>
                <div className="text-center w-full p-4 font-bold">
                    <h1 className="text-2xl md:text-4xl text-gray-800 mb-4">
                        Reserva tu cita para obtener <br />
                        una <span className="text-purple font-extrabold">Belleza</span> brillante
                    </h1>
                </div>

                {loading && <p className="text-center text-gray-600">Cargando servicio...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>} 

                {service && (
                    <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
                        <div className="w-full md:w-1/2 flex flex-col items-center">
                            <Calendario onTimeSelect={handleDateChange} />
                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl w-full mb-4"> 
                                <h2 className='text-purple text-xl font-semibold'>Costo del servicio</h2>
                                <h2 className="text-purple text-lg text-center">
                                    ₡{service.price}
                                </h2>
                            </div>
                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl w-full"> 
                                <h2 className='text-purple text-xl font-semibold'>Detalles a tomar en cuenta</h2>
                                <h2 className="text-purple text-lg text-center">
                                    {service.details}
                                </h2>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            <ServiceCard serviceName={service.name} imgName="identificador" />
                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl w-full">
                                <h2 className='text-purple text-xl font-semibold'>Consideraciones</h2>
                                <h2 className="text-purple text-lg text-center">
                                    {service.considerations}
                                </h2>
                            </div>
                            <ServiceCard serviceName={service.aprox_time} imgName="identificador" />
                        </div>
                    </div>
                )}

                {warningMessage && <p className="text-center text-red-500 mb-4">{warningMessage}</p>} 

                <div className="flex justify-center mt-6 mb-20 gap-4">
                    <button  
                        className="font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white px-10 py-4 rounded-xl" 
                        onClick={handleOrder}
                        disabled={loading} 
                    >
                        Completar Orden
                    </button>
                    <button  
                        className="font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white px-10 py-4 rounded-xl" 
                        onClick={handleAddToCart} 
                        disabled={loading} 
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
