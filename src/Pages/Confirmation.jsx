
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

export function Confirmation() {
    const location = useLocation();
    const { service } = location.state || {};



    return (
        <div>
            <Nav />
            <div className="p-4 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-center">Confirmación de Reserva</h1>
                
                {service ? (
                    <div className="mt-4 border p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{service.name}</h2>
                        <p>Precio: ₡{service.price}</p>
                        <p>Duración aproximada: {service.aprox_time}</p>
                        <p>Detalles: {service.details}</p>
                        <p>Consideraciones: {service.considerations}</p>
                        <p>Fecha: {dayjs(service.date).format('DD/MM/YYYY')}</p>

                    </div>
                ) : (
                    <p>No hay información de servicio disponible.</p>
                )}
                <div className="flex justify-center mt-6 mb-20">
                    <button  
                        className="font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/2 h-10 rounded-xl"
                        onClick={null}
                      
                    >
                        Completar Orden
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

