import * as React from 'react';
import Button from '@mui/material/Button';
import ImageUploader from './ImageUploader';
import Modal from '@mui/material/Modal';
import SignInputs from './SignInputs';

export default function EditProfile({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-start justify-end p-4 pt-20">
        <div className="bg-purple text-white max-w-sm rounded-md p-6 relative w-full">
          <button onClick={onClose} className="absolute top-4 left-4 text-white">X</button>
          <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>
          <ImageUploader/>
                <div className='flex flex-col gap-4 mt-4'>
                    <SignInputs placeholder={"Name"} />
                    <select className="w-full border border-gray-300 rounded-md p-2 mb-4 hover:bg-gray-200 transition duration-300" defaultValue="Estilista">
                        <option value="Estilista">Estilista</option>
                        <option value="Carpintero">Carpintero</option>
                        <option value="Cocinero">Cocinero</option>
                    </select>

                    <SignInputs placeholder={"Password"} />
                </div>

            <div className="flex justify-center">
              <button onClick={onClose} className="bg-white mt-4 text-purple rounded-lg w-full py-4 hover:bg-gray-200 transition duration-300 mb-2">Editar</button>
            </div>
        </div>
      </div>
    </Modal>
  );
}


