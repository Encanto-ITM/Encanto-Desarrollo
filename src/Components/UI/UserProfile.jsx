import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import Modal from '@mui/material/Modal';
import EditProfile from './EditProfile';
import { fetchUserData } from '../hooks/userData'; 
import { logout } from '../hooks/useLogout'; 
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

export default function UserProfile({ open, onClose }) {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isExiting, setIsExiting] = useState(false); 
    const navigate = useNavigate();

    const handleProfileUpdated = (updatedUser) => {
        setUserData(updatedUser); 
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
            setIsExiting(false);
        }, 500);
    };
    const handleCloseEdit = () => {
        setIsExiting(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsExiting(false);
        }, 500);
      };

    const closeEditProfileModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchUserData();
            if (user) {
                setUserData(user);
                setShowContent(true);
            } else {
                window.location.href = '/login'; 
            }
        };

        if (open) {
            fetchData();
            setShowContent(false);
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            setShowContent(true);
            setIsExiting(false); 
        }
    }, [open]);

    if (!userData) return null; 

    const handleGoToWorkerProfile = () => {
        navigate(`/workerprofile/${userData.id}`, { state: { worker: userData } });
    };

    const handleOrders = () => {
        navigate(`/list/${userData.id}`);
        closeModal();
    };

    return (
        <Modal open={open} onClose={closeModal}>
            <Box className="fixed inset-0 flex items-start justify-end p-4 pt-20">
                <Grow in={showContent && !isExiting} timeout={500}>
                    <div className='bg-white text-black max-w-lg w-full rounded-lg relative shadow-lg overflow-y-auto' style={{ maxHeight: '90vh' }}>
                        
                        <div className="p-6 relative">
                            <button onClick={closeModal} className="absolute top-4 right-4 text-black text-lg">X</button>
                            
                            <div className='flex flex-col items-center text-center'>
                                <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-full border-2 border-gray-300 overflow-hidden">
                                    <img className="w-full h-full object-cover" src={userData.profilephoto || '/img/Death Note.jpg'} alt={`${userData.name} ${userData.lastname}`} />
                                </div>
                                <h2 className="text-2xl font-bold mt-4">{userData.name} {userData.lastname}</h2>
                                <div className='flex items-center text-center gap-3'>
                                    <button onClick={openModal} className="rounded mt-4 border-2 bg-blue border-blue text-white p-2 hover:scale-105 duration-300">Editar</button>
        
                                    {userData.acounttype_id === 3 && (
                                        <button onClick={handleGoToWorkerProfile} className="rounded mt-4 border-2 border-blue text-blue p-2 hover:scale-105 duration-300">Ver perfil</button>
                                    )}
                                    <button onClick={handleOrders} className="rounded mt-4 border-2 border-blue bg-blue text-white p-2 hover:scale-105 duration-300">Ver Ordenes</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-purple p-6 rounded-b-lg shadow-md'>
                            <p className="text-white text-xs">Email</p>
                            <p className="text-white text-base mb-3">{userData.email}</p>
                            <hr className="border-white my-2" /> 

                            <p className="text-white text-xs">Número de Contacto</p>
                            <p className="text-white text-base mb-3">{userData.contact_number || 'No disponible'}</p>
                            <hr className="border-white my-2" /> 

                            <p className="text-white text-xs">Descripción</p>
                            <p className="text-white text-base mb-3">{userData.description || 'No hay descripción disponible'}</p>
                            <hr className="border-white my-2" /> 

                            <button onClick={logout} className="rounded mt-4 border-2 border-red text-white bg-red p-2 hover:scale-105 duration-300">Cerrar Sesión</button>
                        </div>
        
                        <EditProfile 
                        open={isModalOpen} 
                        onClose={handleCloseEdit} 
                        user={userData} 
                        onProfileUpdated={handleProfileUpdated} 
                        />
                    </div>
                </Grow>
            </Box>
        </Modal>
    );
}
