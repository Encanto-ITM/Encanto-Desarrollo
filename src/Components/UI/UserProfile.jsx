import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import Modal from '@mui/material/Modal';
import EditProfile from './EditProfile';
import { fetchUserData } from '../hooks/userData'; 
import { logout } from '../hooks/useLogout'; 

export default function UserProfile({ open, onClose }) {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleProfileUpdated = (updatedUser) => {
        setUserData(updatedUser); 
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchUserData();
            if (user) setUserData(user); 
            else {
                window.location.href = '/login'; 
            }
        };
    
        if (open) fetchData();
    }, [open]);

    if (!userData) return null; 

    const handleGoToWorkerProfile = () => {
        navigate(`/workerprofile/${userData.id}`, { state: { worker: userData } });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-start justify-end p-4 pt-20"> {/* Mismo estilo que el modal de edición */}
                <div className="bg-purple text-white max-w-lg w-full rounded-lg p-6 relative shadow-lg overflow-y-auto" style={{ maxHeight: '90vh' }}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg">X</button>
                    <div className='flex flex-col items-center text-center'>
                        <ImageUploader /> 
                        <h2 className="text-2xl font-bold mt-4">{userData.name}</h2>
                        <h3 className="text-xl font-semibold mb-2">{userData.lastname}</h3>
                        <p className="text-sm mb-2">{userData.email}</p>
                        <p className="text-sm mb-6 italic">{userData.description || 'No hay descripción disponible'}</p>
                        <div className="flex justify-center w-full">
                            <button
                                onClick={openModal}
                                className="bg-white text-purple rounded-lg w-full py-4 hover:bg-gray-200 transition duration-300 mb-2 text-lg font-semibold">
                                Editar
                            </button>
                        </div>
                        {userData.acounttype_id === 3 && ( 
                            <button
                                onClick={handleGoToWorkerProfile}
                                className="bg-gray-700 text-white rounded-lg w-full py-4 hover:bg-gray-600 transition duration-300 mb-2 text-lg font-semibold">
                                Ver perfil
                            </button>
                        )}
                        <button
                            onClick={logout}
                            className="mt-4 bg-red-500 text-white rounded-lg w-full py-4 hover:bg-red-600 transition duration-300 text-lg font-semibold">
                            Cerrar Sesión
                        </button>
                    </div>
                    
                    <EditProfile 
                        open={isModalOpen} 
                        onClose={closeModal} 
                        user={userData} 
                        onProfileUpdated={handleProfileUpdated} 
                    />
                </div>
            </div>
        </Modal>
    );
}

