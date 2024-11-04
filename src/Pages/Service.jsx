import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useServiceData } from '../Components/hooks/useServiceData';
import LoadingSpinner from '../Components/UI/LoadingSpinner';
import { fetchUserData } from '../Components/hooks/userData';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { EditService } from '../Components/service-components/EditService.jsx';
import { DeactivateService } from '../Components/service-components/DeactivateService.jsx';
import { CommentsService } from '../Components/service-components/CommentsService.jsx';
import { ViewComments } from '../Components/service-components/ViewComments.jsx';

export function Service() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { serviceData: initialServiceData, error, loading } = useServiceData(id);
    const [serviceData, setServiceData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [ownerData, setOwnerData] = useState(null);
    const [loadingOwner, setLoadingOwner] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (initialServiceData) {
            setServiceData(initialServiceData);
        }
    }, [initialServiceData]);

    useEffect(() => {
        const getOwnerData = async () => {
            if (serviceData && serviceData.owner_id) {
                try {
                    const response = await fetch(`https://tulookapiv2.vercel.app/api/api/users/${serviceData.owner_id}`);
                    if (!response.ok) {
                        throw new Error(`Error al obtener los datos del propietario: ${response.statusText}`);
                    }
                    const user = await response.json();
                    setOwnerData(user);
                } catch (error) {
                    console.error('Error al obtener datos del propietario:', error);
                    setOwnerData(null);
                } finally {
                    setLoadingOwner(false);
                }
            }
        };

        getOwnerData();
    }, [serviceData]);

    useEffect(() => {
        const getCurrentUser = async () => {
            const user = await fetchUserData();
            setCurrentUser(user);
        };

        getCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser && serviceData) {
            setIsOwner(currentUser.id === serviceData.owner_id);
        }
    }, [currentUser, serviceData]);

    const handleUpdate = (updatedService) => {
        setServiceData(updatedService);
    };

    const handleDeactivate = (updatedService) => {
        console.log("Servicio actualizado:", updatedService); 
        setServiceData(updatedService); 
        navigate(`/service/${updatedService.id}`);
        setIsDeactivateModalOpen(false);
    };

    const handleCommentSubmit = (commentData) => {
        setComments((prevComments) => [...prevComments, commentData]);
    };

    if (loading || loadingOwner) return <LoadingSpinner />;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!serviceData) return <div>No se encontró el servicio.</div>;

    return (
        <>
            <Nav />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-5xl font-bold text-center text-blue-700 mb-8">Servicio</h1>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src='/img/Death Note.jpg'
                            alt={serviceData.name}
                            className="w-full h-[30rem] object-cover"
                        />
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <h2 className="text-4xl font-semibold text-blue-600">{serviceData.name}</h2>

                        <div className="space-y-4">
                            <p className="text-lg"><strong>Propietario:</strong> {ownerData ? `${ownerData.name} ${ownerData.lastname}` : 'Cargando...'}</p>
                            <p className="text-lg"><strong>Estado:</strong> {serviceData.is_active === 2 ? "Inactivo" : "Activo"}</p>
                            <p className="text-lg"><strong>Precio:</strong> <span className="text-green-600">${serviceData.price}</span></p>
                            <p className="text-lg"><strong>Horario:</strong> {serviceData.schedule}</p>
                            <p className="text-lg"><strong>Duración estimada:</strong> {serviceData.aprox_time}</p>
                            <p className="text-lg"><strong>Materiales:</strong> {serviceData.material_list}</p>
                            <p className="text-lg"><strong>Detalles:</strong> {serviceData.details}</p>
                            <p className="text-lg"><strong>Consideraciones:</strong> {serviceData.considerations}</p>
                        </div>

                        <CommentsService serviceId={serviceData.id} userId={currentUser ? currentUser.id : null} onSubmitComment={handleCommentSubmit} />

                        <div className="mt-6">
                            <ViewComments serviceId={serviceData.id} />
                        </div>
                        

                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 mt-8 space-y-4 sm:space-y-0">
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto bg-purple text-white text-lg px-6 py-3 rounded-md hover:scale-105 transition duration-300"
                            >
                                Volver
                            </button>
                            {isOwner && (
                                <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-4 space-y-4 sm:space-y-0">
                                    <button onClick={() => setIsEditModalOpen(true)} className="bg-purple text-white text-lg px-6 py-3 rounded-md">Editar Servicio</button>
                                    <button 
                                        onClick={() => setIsDeactivateModalOpen(true)} 
                                        className={`${serviceData.is_active === 1 ? 'bg-red' : 'bg-green'} text-white text-lg px-6 py-3 rounded-md hover:bg-red-700 transition duration-300`}
                                    >
                                        {serviceData.is_active === 1 ? 'Desactivar' : 'Activar'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EditService 
                isOpen={isEditModalOpen} 
                serviceData={serviceData} 
                onUpdate={handleUpdate} 
                onClose={() => setIsEditModalOpen(false)} 
            />
            <DeactivateService 
                service={serviceData} 
                isOpen={isDeactivateModalOpen} 
                onClose={() => setIsDeactivateModalOpen(false)} 
                onConfirm={handleUpdate} 
            />
            <Footer />
        </>
    );
}
