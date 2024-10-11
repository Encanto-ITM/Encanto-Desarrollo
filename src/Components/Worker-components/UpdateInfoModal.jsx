import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';

export default function UpdateInfoModal({ open, onClose, worker }) {
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profession, setProfession] = useState('');

    useEffect(() => {
        if (worker) {
            setAddress(worker.address || '');
            setDescription(worker.description || '');
            setProfession(worker.profession || '');
        }
    }, [worker, open]);


    const handleSave = async () => {
        const updatedInfo = {
            address,
            description,
            profession,
        };

        console.log('Updated Info:', updatedInfo);

       
        try {
            const response = await fetch(`https://tulook-api.vercel.app/api/api/workers/${worker.id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedInfo),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la información');
            }

          
            console.log('Información actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la información:', error);
        }

        onClose(); 
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">
                        X
                    </button>
                    <h2 className="text-xl font-bold mb-4">Update Information</h2>

                    <div>
                        <label className="block text-sm font-medium">Profession</label>
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Direction</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div className="flex justify-center mt-10">
                        <GenericButton className="text-white" onClick={handleSave} placeholder="Save Changes" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
