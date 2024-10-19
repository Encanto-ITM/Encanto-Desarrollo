import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';

export default function UpdateInfoModal({ open, onClose, worker, onUpdate }) {
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profession, setProfession] = useState('');

    useEffect(() => {
        if (worker) {
            setAddress(worker.address || '');
            setDescription(worker.description || '');
            setProfession(worker.professions_id || '');
        }
    }, [worker, open]);

    const handleSave = async () => {
        const updatedInfo = {
            address,
            description,
            professions_id: profession,
        };

        console.log('Updated Info:', updatedInfo);

        try {
            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/users/${worker.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedInfo),
            });

            const responseData = await response.json(); 
            console.log('Response from API:', responseData);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${responseData.message || 'Error desconocido'}`);
            }

            console.log('Información actualizada correctamente');
            onUpdate(updatedInfo); // Llama a onUpdate con la nueva información
            onClose(); 
        } catch (error) {
            console.error('Error al actualizar la información:', error);
        }
    };

    const professionsMap = {
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
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">
                        X
                    </button>
                    <h2 className="text-xl font-bold mb-4">Update Information</h2>

                    <div>
                        <label className="block text-sm font-medium">Profession</label>
                        <select
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            {Object.entries(professionsMap).map(([id, name]) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Address</label>
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

                    <div className="flex justify-center mt-6">
                        <GenericButton onClick={handleSave} placeholder="Save Changes" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
