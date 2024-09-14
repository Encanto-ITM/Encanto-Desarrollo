import * as React from 'react';
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import Modal from '@mui/material/Modal';
import EditProfile from './EditProfile';

export default function UserProfile({ open, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-start justify-end p-4 pt-28">
        <div className="bg-purple text-white max-w-sm rounded-md p-10 relative">
          <button onClick={onClose} className="absolute top-4 left-4 text-white">X</button>
          <div className='flex flex-col text-center'>
            <ImageUploader />
            <h2 className="text-xl font-bold">Juan Perez</h2>
            <h3 className="text-xl font-bold mb-4">Estilista</h3>
            <p className="text-sm mb-6">Mi enfoque innovador y mi amor por las tendencias me han permitido ofrecer un estilo único a cada uno de mis clientes.</p>
            <div className="flex justify-center">
              <button onClick={openModal} className="bg-white text-purple rounded-lg w-full py-4 hover:bg-gray-200 transition duration-300 mb-2">Editar</button>
            </div>
            <a href="#">Cerrar Sesion</a>
          </div>
          <EditProfile open={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
