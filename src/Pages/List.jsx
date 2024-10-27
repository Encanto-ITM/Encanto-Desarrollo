import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { fetchUserData } from '../Components/hooks/userData.js';
import { useState, useEffect } from 'react';

export function List() {
    const [appointments, setAppointments] = useState([]); 
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null); 

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
    
    useEffect(() => {
        if (user) {
            getList();
        }
    }, [user]); 

    const getList = async () => {
        if (!user) {
            setMessage('Los datos del usuario no están disponibles.');
            return;
        }
        try {
            let response;
            if (user.account_type === 3) {
                response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${user.id}/owner`);
            } else {
                response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${user.id}/client`);
            }
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setAppointments(data.data);
        } catch (error) {
            console.error(error);
            setMessage('Error al cargar las citas.');
        }
    };

    const handleAccept = async (appointmentId) => {
        try {
            const appointment = appointments.find(app => app.id === appointmentId);
            const updatedData = {
                service_id: appointment.service_id,
                owner_id: appointment.owner_id,
                applicant: user.id,
                date: appointment.date,
                status: 'Aceptado',
                total: appointment.total,
                location: appointment.location,
            };

            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al aceptar la cita');
            }

            setMessage('Cita aceptada con éxito.');
            getList(); 
        } catch (error) {
            console.error('Error al aceptar la cita:', error);
            setMessage('Error al aceptar la cita.');
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const appointment = appointments.find(app => app.id === appointmentId);
            const updatedData = {
                service_id: appointment.service_id,
                owner_id: appointment.owner_id,
                applicant: user.id,
                date: appointment.date,
                status: 'Cancelado',
                total: appointment.total,
                location: appointment.location,
            };

            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al cancelar la cita');
            }

            setMessage('Cita cancelada con éxito.');
            getList();
        } catch (error) {
            console.error('Error al cancelar la cita:', error);
            setMessage('Error al cancelar la cita.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <h2 className="text-2xl font-bold text-center py-4 my-4 border-b">Listado de citas</h2>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-6xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {message && <p className="text-red-500 text-center col-span-3">{message}</p>}
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment.id} className="bg-white shadow-lg rounded-lg p-4 border">
                                    <p className="font-semibold">ID: <span className="font-normal">{appointment.id}</span></p>
                                    <p className="font-semibold">Estado: <span className="font-normal">{appointment.status}</span></p>
                                    <p className="font-semibold">Total: <span className="font-normal">${appointment.total}</span></p>
                                    <p className="font-semibold">Detalles: <span className="font-normal">{appointment.location}</span></p>
                                    <p className="font-semibold">Fecha: <span className="font-normal">{appointment.date}</span></p>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleAccept(appointment.id)}
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleCancel(appointment.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-3">No hay citas disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}