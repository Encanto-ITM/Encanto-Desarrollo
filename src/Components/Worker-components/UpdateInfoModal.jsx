import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';

export default function UpdateInfoModal({ open, onClose, worker }) {
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profession, setProfession] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [headerPhoto, setHeaderPhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [headerPhotoPreview, setHeaderPhotoPreview] = useState(null);

    useEffect(() => {
        if (worker) {
            setAddress(worker.address || '');
            setDescription(worker.description || '');
            setProfession(worker.profession || '');
            setProfilePhoto(worker.profilephoto);
            setHeaderPhoto(worker.headerphoto);
        }
    }, [worker, open]);

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setProfilePhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleHeaderPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeaderPhoto(file);
            setHeaderPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        const updatedInfo = {
            address,
            description,
            profession,
            profilephoto: profilePhoto,
            headerphoto: headerPhoto
        };

        console.log('Updated Info:', updatedInfo);

        try {
            const formData = new FormData();
            formData.append('address', address);
            formData.append('description', description);
            formData.append('profession', profession);
            if (profilePhoto) formData.append('profilephoto', profilePhoto);
            if (headerPhoto) formData.append('headerphoto', headerPhoto);

            const response = await fetch(`https://tulook-api.vercel.app/api/api/users/${worker.id}`, {
                method: 'PUT',
                body: formData,
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

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePhotoChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                        {profilePhotoPreview && (
                            <img
                                src={profilePhotoPreview}
                                alt="Profile Preview"
                                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Header Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleHeaderPhotoChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                        {headerPhotoPreview && (
                            <img
                                src={headerPhotoPreview}
                                alt="Header Preview"
                                className="mt-4 w-full h-40 object-cover"
                            />
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium">Profession</label>
                        <select
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="" disabled>Select a profession</option>
                            {Object.entries(professionsMap).map(([id, professionName]) => (
                                <option key={id} value={id}>
                                    {professionName}
                                </option>
                            ))}
                        </select>
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
