import React, { useEffect, useState } from 'react';

export default function ServicesCard({ service, fetchCurrentUser }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const user = await fetchCurrentUser(); 
            setCurrentUser(user);
        };

        getCurrentUser();
    }, []);

    const handleActivate = () => {
       
        console.log(`Activando el servicio: ${service.name}`);
    };

    const handleDeactivate = () => {
       
        console.log(`Desactivando el servicio: ${service.name}`);
    };

    const isOwner = currentUser && currentUser.id === service.ownerId; 

    return (
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col h-full">
            <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded-t-md"
            />
            <h2 className="text-xl font-semibold mt-2">{service.name}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
                {service.description}
            </p>
            {isOwner ? (
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                        onClick={handleActivate}
                    >
                        Activate
                    </button>
                    <button
                        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                        onClick={handleDeactivate}
                    >
                        Deactivate
                    </button>
                </div>
            ) : (
                <button
                    className="mt-4 bg-purple text-white rounded-md px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-black"
                >
                    Ver más
                </button>
            )}
        </div>
    );
}
