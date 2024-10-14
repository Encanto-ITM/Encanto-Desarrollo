import React, { useState } from 'react';

export default function ServicesCard({ service }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col h-full">
            <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded-t-md"
            />
            <h2 className="text-xl font-semibold mt-2">{service.name}</h2>
            <p
                className={`text-sm text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}
                style={{
                    maxHeight: isExpanded ? 'none' : '4.5rem', 
                    overflow: 'hidden',
                }}
            >
                {service.description}
            </p>
            <button
                className="mt-4 bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600"
                onClick={toggleDescription}
            >
                {isExpanded ? 'Show less' : 'Find out more'}
            </button>
        </div>
    );
}
