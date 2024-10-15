import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import UpdateInfoModal from './UpdateInfoModal';
import NewServiceModal from './NewServiceModal';
import { fetchUserData } from '../hooks/userData'; 
import LoadingSpinner from '../UI/LoadingSpinner';  // Importamos el spinner

export function WorkerInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false); 
  const [workerData, setWorkerData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Estado de carga
  const location = useLocation();
  const { worker } = location.state || {};

  useEffect(() => {
    const getUserData = async () => {
      const user = await fetchUserData();
      setCurrentUser(user);
      setIsLoading(false);  // Detener el loading cuando los datos se hayan cargado
    };

    getUserData();

    if (worker) {
      setWorkerData(worker);
    }
  }, [worker]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openNewServiceModal = () => setIsNewServiceModalOpen(true); 
  const closeNewServiceModal = () => setIsNewServiceModalOpen(false); 

  const handleUpdate = async (updatedInfo) => {
    try {
      const response = await api.updateWorker(workerData.id, updatedInfo);

      if (response.ok) {
        console.log('Worker info updated successfully:', response.data);
        setWorkerData(prevData => ({ ...prevData, ...updatedInfo }));
      } else {
        console.error('Error updating worker info:', response.statusText);
      }

      closeModal();
    } catch (error) {
      console.error('Error updating worker info:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;  // Mostramos el componente de carga mientras los datos se cargan
  }

  if (!workerData) {
    return <p>No worker data found</p>;
  }

  const isOwner = currentUser && currentUser.id === workerData.id;

  const professionsMap = {
    1: 'Admin',
    2: 'Usuario',
    3: 'Estilista',
    4: 'Manicura',
    5: 'Pedicura',
    6: 'Peluquero',
    7: 'Barbero',
    8: 'Cuidador de piel',
    9: 'Depiladora',
    10: 'Maquilladora',
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md w-full mx-auto">
      <h3 className="text-xl font-bold mb-6">Worker Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Profession</p>
            <div className="mt-2">
              <span className="bg-purple text-white px-4 py-2 rounded-full">
                {professionsMap[workerData.professions_id] || 'Profession not found'}
              </span>
            </div>
          </div>

          <div className="mt-10 w-full max-w-full md:w-[600px]">
            <p className="text-lg font-semibold">Description</p>
            <p className="mt-2 bg-gray-100 rounded-lg text-base font-medium text-gray-700 p-4">
              {workerData.description}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Direction</p>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-lg mt-2 p-1">
              <p className="text-md text-gray-700 text-center">
                {workerData.address}
              </p>
            </div>
          </div>
          <div className="mt-6 ">
            <p className="text-lg font-semibold">Social Media</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaFacebookF />
                </div>
                <span className="text-gray-600">{workerData.facebook || 'No se ha registrado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaWhatsapp />
                </div>
                <span className="text-gray-600">{workerData.whatsapp || 'No se ha registrado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaInstagram />
                </div>
                <span className="text-gray-600">{workerData.instagram || 'No se ha registrado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaTwitter />
                </div>
                <span className="text-gray-600">{workerData.twitter || 'No se ha registrado'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex justify-start mt-6 w-[300px] gap-4">
          {isOwner && (
            <>
              <GenericButton onClick={openModal} placeholder="Update Info" />
              <button
                onClick={openNewServiceModal}
                className="font-bold flex items-center justify-center bg-gray-100 hover:bg-gray-300 text-black p-2 w-[80%] h-10 rounded-xl transition-colors duration-300 mt-3"
              >
                New service
              </button>
            </>
          )}
        </div>
      </div>

      <UpdateInfoModal
        open={isModalOpen}
        onClose={closeModal}
        worker={workerData}
        onUpdate={handleUpdate}
      />
      <NewServiceModal
        open={isNewServiceModalOpen}
        onClose={closeNewServiceModal}
        worker={workerData}
      />
    </div>
  );
}

