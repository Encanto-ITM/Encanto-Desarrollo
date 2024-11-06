import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import ImageUploader from './ImageUploader';
import EditInput from './EditInputs';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import ChangePassword from './ChangePassword';

export default function EditProfile({ open, onClose, user, onProfileUpdated }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false); 

  useEffect(() => {
    if (open) {
      setShowContent(true);
      setIsExiting(false);
      setName(user.name || '');
      setLastname(user.lastname || '');
      setDescription(user.description || '');
      setContactNumber(user.contact_number || ''); 
    } else {
      if (isExiting) {
        setShowContent(false);
      }
    }
  }, [open, user, isExiting]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token de autenticación.');
      return;
    }

    if (!name || !lastname || !contactNumber) {
      console.error('Los campos nombre, apellido y número de contacto son obligatorios.');
      return;
    }

    const data = { name, lastname, description, contact_number: contactNumber };

    try {
      setIsLoading(true);
      const response = await fetch(`https://tulookapiv2.vercel.app/api/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al actualizar la información: ${errorMessage}`);
      }

      const responseBody = await response.json();
      onProfileUpdated(responseBody);
      closeModal();
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true); 
  };

  const handlePasswordUpdated = (updatedUser) => {
    console.log('Contraseña actualizada:', updatedUser);
    setIsChangePasswordOpen(false); 
  };

  return (
    <>
      <Modal open={open} onClose={closeModal}>
        <Box className="fixed inset-0 flex items-start justify-end p-4 pt-20">
          <Grow in={showContent && !isExiting} timeout={500}>
            <div className="max-w-lg w-full rounded-lg shadow-lg overflow-y-auto" style={{ maxHeight: '90vh' }}>
              <div className="bg-white text-black rounded-t-lg p-4 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-black focus:outline-none"
                >
                  X
                </button>
                <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
                <ImageUploader />
              </div>

              <div className="bg-purple text-white p-4 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 justify-items-center">
                  <EditInput label="Nombre" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  <EditInput label="Apellido" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                  <EditInput label="Descripción" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <EditInput label="Número de Contacto" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                </div>

                <div className="flex flex-col md:flex-row mt-10 mb-16 md:space-y-0 md:space-x-4">
                  <button
                    onClick={handleUpdate}
                    className={`rounded border-2 bg-white text-purple p-2 hover:scale-105 duration-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'w-full md:w-1/2'}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Actualizando...' : 'Confirmar Editar'}
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="rounded border-2 bg-white text-purple mt-4 p-2 hover:scale-105 duration-500 w-full md:w-1/2"
                  >
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </Grow>
        </Box>
      </Modal>

      <ChangePassword 
        open={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
        user={user} 
        onPasswordUpdated={handlePasswordUpdated} 
      />
    </>
  );
}
