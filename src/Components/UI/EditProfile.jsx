import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import ImageUploader from './ImageUploader';
import SignInputs from './SignInputs';

export default function EditProfile({ open, onClose, user, onProfileUpdated }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (open && user) {
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      setDescription(user.description || '');
      setPassword(user.password || '');
      setSelectedImage(null);
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

    if (!name || !lastname || !email) {
      console.error('Los campos nombre, apellido y correo electrónico son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('description', description);
    if (password) formData.append('password', password);
    if (selectedImage) formData.append('profilephoto', selectedImage);

    try {
      const response = await fetch(`https://tulook-api.vercel.app/api/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error en la respuesta de la API:', errorMessage);
        throw new Error(`Error al actualizar la información: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Perfil actualizado:', data);

      onProfileUpdated(data);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-start justify-end p-4 pt-20">
        <div className="bg-purple text-white max-w-sm rounded-lg p-6 relative w-full">
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg">X</button>
          <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
          <ImageUploader onImageChange={handleImageChange} />
          <div className='flex flex-col gap-4 mt-4 text-black'>
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
              placeholder={"Contraseña"} 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleUpdate}
              className="bg-white text-purple rounded-lg w-full py-3 hover:bg-gray-200 transition duration-300"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
