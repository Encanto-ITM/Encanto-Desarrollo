import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const socialMediaOptions = [
    { name: 'Facebook', icon: <FaFacebookF /> },
    { name: 'WhatsApp', icon: <FaWhatsapp /> },
    { name: 'Instagram', icon: <FaInstagram /> },
    { name: 'Twitter', icon: <FaTwitter /> },
];

export default function UpdateInfoModal({ open, onClose }) {
    const [socialMedia, setSocialMedia] = useState([]);
    const [socialMediaName, setSocialMediaName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [experienceList, setExperienceList] = useState(['']);
    const [profession, setProfession] = useState(''); // Nuevo estado para la profesión

    const handleSave = () => {
        console.log('Updated Info:', { socialMedia, direction, description, experienceList, profession });
        onClose();
    };

    const addExperience = () => {
        setExperienceList([...experienceList, '']);
    };

    const removeExperience = (index) => {
        const newList = experienceList.filter((_, i) => i !== index);
        setExperienceList(newList);
    };

    const handleExperienceChange = (index, value) => {
        const newList = [...experienceList];
        newList[index] = value;
        setExperienceList(newList);
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Social Media</label>
                        <div className="flex flex-wrap mb-2">
                            {socialMedia.map((media, index) => (
                                <div key={index} className="flex items-center mr-2 mb-2">
                                    <div className="bg-gray-300 rounded-md px-3 py-1 text-sm flex items-center">
                                        <span className="flex items-center mr-2">
                                            {media.icon}
                                            <span className="ml-1">{media.name}</span>
                                        </span>
                                        <button onClick={() => removeSocialMedia(media.name)} className="text-red-500 font-extrabold">X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={socialMediaName}
                            onChange={(e) => setSocialMediaName(e.target.value)}
                            placeholder="Enter social media name"
                            className="border rounded-md p-2 w-full mb-2"
                        />
                        <select
                            value={selectedIcon}
                            onChange={(e) => setSelectedIcon(e.target.value)}
                            className="border rounded-md p-2 w-full mb-2"
                        >
                            <option value="">Select Icon</option>
                            {socialMediaOptions.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name} {/* Solo el nombre, sin SVG */}
                                </option>
                            ))}
                        </select>
                        <div className='flex justify-center'>
                            <button
                                onClick={addSocialMedia}
                                className="bg-blue-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
                            >
                                Add Social Media
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Direction</label>
                        <input
                            type="text"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Enter direction"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Profession</label> {/* Nueva sección para profesión */}
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Enter profession"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded-md p-2 w-full"
                            placeholder="Enter description"
                            rows="3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Experience</label>
                        <div className="flex flex-wrap mb-2 justify-center">
                            {experienceList.map((exp, index) => (
                                <div key={index} className="flex items-center mr-2 mb-2">
                                    <div className="bg-gray-300 rounded-md px-3 py-1 text-sm flex items-center ">
                                        <input
                                            type="text"
                                            value={exp}
                                            onChange={(e) => handleExperienceChange(index, e.target.value)}
                                            placeholder="Experience"
                                            className="border rounded-lg p-1 "
                                        />
                                        <button onClick={() => removeExperience(index)} className="text-red-500 font-extrabold ml-2">X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={addExperience}
                                className="bg-blue-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
                            >
                                Add Experience
                            </button>
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
