import React, { useState } from 'react';
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import UpdateInfoModal from './UpdateInfoModal'; // Asegúrate de importar el modal

export function WorkerInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md w-full mx-auto">
      <h3 className="text-xl font-bold mb-6">Worker Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Profession</p>
            <div className="mt-2">
              <span className="bg-purple text-white px-4 py-2 rounded-full">Barber</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold">Experience</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-400 text-white px-3 py-1 rounded-full">More 5 years</span>
              <span className="bg-gray-400 text-white px-3 py-1 rounded-full">Beard Styles</span>
              <span className="bg-gray-400 text-white px-3 py-1 rounded-full">Hair Blurring</span>
            </div>
          </div>

          <div className="mb-6 w-[600px]">
            <p className="text-lg font-semibold">Description</p>
            <p className="mt-2 bg-gray-100 rounded-lg text-base font-medium text-gray-700 p-4">
              As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Direction</p>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-lg mt-2 p-1">
              <p className="text-md text-gray-700 text-center">
                100 mts este, 75 norte de la Universidad de Costa Rica, Nances Esparza
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-lg font-semibold">Social Media</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaFacebookF />
                </div>
                <span className="text-gray-600">Pablito Barbers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaWhatsapp />
                </div>
                <span className="text-gray-600">Pablito Barbers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaInstagram />
                </div>
                <span className="text-gray-600">Pablito Barbers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple text-white p-2 rounded-md">
                  <FaTwitter />
                </div>
                <span className="text-gray-600">Pablito Barbers</span>
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

      
      <UpdateInfoModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}
