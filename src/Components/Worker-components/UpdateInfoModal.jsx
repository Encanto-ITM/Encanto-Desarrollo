import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const socialMediaOptions = [
    { name: 'Facebook', icon: <FaFacebookF /> },
    { name: 'WhatsApp', icon: <FaWhatsapp /> },
    { name: 'Instagram', icon: <FaInstagram /> },
    { name: 'Twitter', icon: <FaTwitter /> },
];

export default function UpdateInfoModal({ open, onClose, worker }) {
    const [socialMedia, setSocialMedia] = useState([]);
    const [socialMediaName, setSocialMediaName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [profession, setProfession] = useState('');

    useEffect(() => {
        if (worker) {
            setSocialMedia(worker.socialMedia || []);
            setDirection(worker.direction || '');
            setDescription(worker.description || '');
            setProfession(worker.profession || '');
        }
    }, [worker, open]);

    const handleSave = async () => {
        const updatedInfo = {
            socialMedia,
            direction,
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

    const addSocialMedia = () => {
        const selectedOption = socialMediaOptions.find(option => option.name === selectedIcon);
        if (socialMediaName && selectedOption) {
            const newSocialMedia = { name: socialMediaName, icon: selectedOption.icon };
            setSocialMedia([...socialMedia, newSocialMedia]);
            setSocialMediaName('');
            setSelectedIcon('');
        }
    };

    const removeSocialMedia = (name) => {
        const newList = socialMedia.filter((media) => media.name !== name);
        setSocialMedia(newList);
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
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
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

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Add Social Media</label>
                        <input
                            type="text"
                            value={socialMediaName}
                            onChange={(e) => setSocialMediaName(e.target.value)}
                            placeholder="Social Media Name"
                            className="mt-1 p-2 border rounded w-full"
                        />
                        <select
                            value={selectedIcon}
                            onChange={(e) => setSelectedIcon(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                        >
                            <option value="">Select Icon</option>
                            {socialMediaOptions.map((option) => (
                                <option key={option.name} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                        <button 
                            onClick={addSocialMedia} 
                            className="mt-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Add
                        </button>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Current Social Media</h3>
                            <ul>
                                {socialMedia.map((media, index) => (
                                    <li key={index} className="flex justify-between items-center mt-2">
                                        <span>{media.icon} {media.name}</span>
                                        <button 
                                            onClick={() => removeSocialMedia(media.name)} 
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <GenericButton className="text-white" onClick={handleSave} placeholder="Save Changes" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
