import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import dayjs from 'dayjs';
import { fetchUserData } from '../Components/hooks/userData.js';
import { useState, useEffect } from 'react';

export function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate(); // Crea la instancia de navigate
    const { service, selectedTime } = location.state || {};
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(null); 
    const formattedDate = selectedTime ? dayjs(selectedTime.$d).format('YYYY-MM-DD HH:mm:ss') : 'Fecha no disponible';

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchUserData();
                setUser(userData);
            } catch (error) {
                setMessage('Error al obtener los datos del usuario.');
            }
        };
        
        getUserData();
    }, []);
    
    const handleOrder = async () => {
        if (!user) {
            setMessage('Los datos del usuario no están disponibles.');
            return;
        }
        console.log('Datos del usuario:', user);
        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: service.id,
                    owner_id: service.owner_id,
                    applicant: user.id, 
                    date: formattedDate, 
                    total: service.price,
                    location: service.details,
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
    
            const data = await response.json();
            setSubmitted(true); 
            navigate(`/list/${user.id}`); 
            
        } catch (error) {
            setMessage('Error al completar la reserva. Intente nuevamente.'); 
        }
    };

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
                        <p>Hora seleccionada: {formattedDate}</p> 
                    </div>
                ) : (
                    <p>No hay información de servicio disponible.</p>
                )}

                {message && (
                    <div className="mt-4 text-center text-red-600">
                        {message}
                    </div>
                )}
                <div className="flex justify-center mt-6 mb-20">
                    <button  
                        className="font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/2 h-10 rounded-xl"
                        onClick={handleOrder}
                        disabled={submitted} 
                    >
                        Completar Orden
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
