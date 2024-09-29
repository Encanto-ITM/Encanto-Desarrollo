import React from 'react';

export function Services() {
    const services = [
        'Barbería',
        'Estilismo',
        'Manicura',
        'Depilación',
        'Cejas',
        'Skin Care',
        'Otros'
    ];

    const img = [
        '/img/Iconos/Barberia.png',
        '/img/Iconos/Estilismo.png',
        '/img/Iconos/Manicura.png',
        '/img/Iconos/Depilacion.png',
        '/img/Iconos/Cejas.png',
        '/img/Iconos/SkinCare.png',
        '/img/Iconos/Otros.png',
    ];

    return (
        <div className="flex flex-wrap justify-center mt-8 mb-24">
            {services.map((service, index) => (
                <div key={service} className="flex flex-col items-center space-y-2 m-4 transition duration-500 hover:scale-110 w-24 sm:w-32 lg:w-40 lg:mx-6">
                    <a href="#" className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200">
                        <img src={img[index]} alt={service} className="w-full h-full object-contain" />
                    </a>
                    <span className="text-center">{service}</span>
                </div>
            ))}
        </div>
    );
}
