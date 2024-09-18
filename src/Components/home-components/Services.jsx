import React from 'react';

export function Services() {
    return (
        <div className="flex justify-around mt-8 mb-24 ">
            {['Barbería', 'Estilismo', 'Manicura', 'Depilación', 'Cejas', 'Skin Care', 'Trenzas'].map((service, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                    <a href="#" className="w-16 h-16 bg-gray-300 rounded-full"></a>
                    <span>{service}</span>
                </div>
            ))}
        </div>
    );
}
