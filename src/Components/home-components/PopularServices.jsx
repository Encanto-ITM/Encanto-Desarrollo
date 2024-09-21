import React from 'react';
import GenericButton from '../UI/GenericButton';

export function PopularServices({ filteredServices, searchTerm }) {
    return (
        <section className="mb-24">
            <h2 className="text-3xl font-bold text-gray-800 mx-auto mb-8 max-w-[94rem]">Popular Services</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto max-w-[94rem]">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-700">{service.name}</h3>
                            <p className="text-gray-500">Service from {service.price}</p>
                            <div className='flex justify-center'>
                                <GenericButton
                                    placeholder={"Order"}
                                    onClick={() => window.location.href = `/order`}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-4 text-center text-gray-600">No results found for "{searchTerm}"</p>
                )}
            </div>
        </section>
    );
}
