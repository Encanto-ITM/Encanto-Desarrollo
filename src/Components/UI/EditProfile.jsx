import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import ImageUploader from './ImageUploader';
import EditInput from './EditInputs';

export default function EditProfile({ open, onClose, user, onProfileUpdated }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setLastname('');
      setEmail('');
      setDescription('');
      setOldPassword('');
      setNewPassword('');
    }
  }, [open]);

  const handleImageChange = (image) => {
    setSelectedImage(image); 
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token de autenticación.');
      return;
    }

    if (!name || !lastname || !email || !oldPassword) {
      console.error('Los campos nombre, apellido, correo electrónico y contraseña vieja son obligatorios.');
      return;
    }

    const data = {
      name,
      lastname,
      email,
      description,
    };

    if (newPassword) {
      data.password = newPassword;
    }

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
        console.error('Error en la respuesta de la API:', errorMessage);
        throw new Error(`Error al actualizar la información: ${errorMessage}`);
      }

      const responseBody = await response.json();
      console.log('Perfil actualizado desde la API:', responseBody);

      onProfileUpdated(responseBody);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-start justify-end p-4 pt-20">
        <div className="max-w-lg w-full rounded-lg shadow-lg overflow-y-auto" style={{ maxHeight: '90vh' }}>
          
        
          <div className="bg-white text-black  rounded-t-lg">
            <button onClick={onClose} className="absolute top-[5.5rem] right-8 text-black">X</button>
            <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
            <ImageUploader onImageChange={handleImageChange} />
          </div>
          
     
          <div className="bg-purple text-white p-6 rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 justify-items-center">
              <EditInput 
                label="Nombre" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <EditInput 
                label="Apellido" 
                id="lastname" 
                value={lastname} 
                onChange={(e) => setLastname(e.target.value)} 
              />
              <EditInput 
                label="Correo Electrónico" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <EditInput 
                label="Descripción" 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
              <EditInput 
                label="Contraseña Vieja" 
                id="oldPassword" 
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
              />
              <EditInput 
                label="Nueva Contraseña" 
                id="newPassword" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
    
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleUpdate}
                className={`rounded mt-4 border-2 border-blue text-blue p-2 w-3/4 mb-8 hover:scale-105 duration-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading} 
              >
                {isLoading ? 'Actualizando...' : 'Editar'}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </Modal>
  );
  
  
  
}
