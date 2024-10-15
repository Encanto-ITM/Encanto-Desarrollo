import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import ImageUploader from './ImageUploader';
import SignInputs from './SignInputs';
import { sha256 } from 'js-sha256'; 

export default function EditProfile({ open, onClose, user, onProfileUpdated }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      setDescription(user.description || '');
      setSelectedImage(null); 
      setOldPassword(''); 
      setNewPassword(''); 
    }
  }, [open, user]);

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
      data.password = await sha256(newPassword); 
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
        <div className="bg-purple text-white max-w-sm rounded-lg p-6 relative w-full shadow-lg">
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg">X</button>
          <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
          <ImageUploader onImageChange={handleImageChange} />
          <div className='flex flex-col items-center gap-4 mt-4 text-black'> 
            <SignInputs 
              placeholder={"Nombre"} 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SignInputs 
              placeholder={"Apellido"} 
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <SignInputs 
              placeholder={"Correo Electrónico"} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SignInputs 
              placeholder={"Descripción"} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SignInputs 
              type="password" 
              placeholder={"Contraseña Vieja"} 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <SignInputs 
              type="password" 
              placeholder={"Nueva Contraseña"} 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleUpdate}
              className={`bg-white text-purple rounded-lg w-full py-3 hover:bg-gray-200 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading} 
            >
              {isLoading ? 'Actualizando...' : 'Editar'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
