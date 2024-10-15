import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';  
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import UpdateInfoModal from './UpdateInfoModal';

export function WorkerInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const location = useLocation();
  const { worker } = location.state || {}; 

  if (!worker) {
    return <p>No worker data found</p>; 
  }


  const handleUpdate = async (updatedInfo) => {
    try {
        const response = await api.updateWorker(worker.id, updatedInfo);
        
        if (response.ok) {
            console.log('Worker info updated successfully:', response.data);
           
        } else {
            console.error('Error updating worker info:', response.statusText);
        }

        closeModal();
    } catch (error) {
        console.error('Error updating worker info:', error);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md w-full mx-auto">
      <h3 className="text-xl font-bold mb-6">Worker Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Profession</p>
            <div className="mt-2">
              <span className="bg-purple text-white px-4 py-2 rounded-full">{worker.profession}</span>
            </div>
          </div>

          <div className="mt-10 w-full max-w-full md:w-[600px]">
            <p className="text-lg font-semibold">Description</p>
            <p className="mt-2 bg-gray-100 rounded-lg text-base font-medium text-gray-700 p-4">
              {worker.description}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Direction</p>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-lg mt-2 p-1">
              <p className="text-md text-gray-700 text-center">
                {worker.address} 
              </p>
            </div>
          </div>
          <div className="mt-6">
    <p className="text-lg font-semibold">Social Media</p>
    <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple text-white p-2 rounded-md">
                <FaFacebookF />
            </div>
            <span className="text-gray-600">
                {worker.facebook ? worker.facebook : 'No Facebook account'}
            </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple text-white p-2 rounded-md">
                <FaWhatsapp />
            </div>
            <span className="text-gray-600">
                {worker.whatsapp ? worker.whatsapp : 'No WhatsApp number'}
            </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple text-white p-2 rounded-md">
                <FaInstagram />
            </div>
            <span className="text-gray-600">
                {worker.instagram ? worker.instagram : 'No Instagram account'}
            </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple text-white p-2 rounded-md">
                <FaTwitter />
            </div>
            <span className="text-gray-600">
                {worker.twitter ? worker.twitter : 'No Twitter account'}
            </span>
        </div>
    </div>
</div>

        </div>
      </div>

      <div className='flex justify-end'>
        <div className="flex justify-start mt-6 w-[300px] gap-4">
          <GenericButton onClick={openModal} placeholder="Update Info" />
          <button className="font-bold flex items-center justify-center bg-gray-100 hover:bg-gray-300 text-black  p-2 w-[80%] h-10 rounded-xl transition-colors duration-300 mt-3">New service</button>
        </div>
      </div>

      <UpdateInfoModal 
          open={isModalOpen} 
          onClose={closeModal} 
          worker={worker} 
          onUpdate={handleUpdate} 
      />
    </div>
  );
}
