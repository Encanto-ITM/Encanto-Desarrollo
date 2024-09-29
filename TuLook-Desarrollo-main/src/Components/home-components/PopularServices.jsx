import React from 'react';
import GenericButton from '../UI/GenericButton';

export function PopularServices({ filteredServices }) {
    return (
        <div className="w-full">
            <section className="p-10">
                <div className="text-center p-8">
                    <h2 className="text-3xl font-bold text-white mb-4 max-w-[94rem]">Popular Services</h2>
                    <h3 className="text-3xl font-bold text-white mb-8 max-w-[94rem]">A selection of the best services of the platform</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center px-6">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <div key={service.id} className="grid gap-2 p-4"> {/* Adjusted padding */}
                                <div className="border-4 border-white w-48 h-48 flex items-center justify-center">
                                    <img src={service.image} alt={service.name} className="max-w-full max-h-full object-cover" />
                                </div>
                                <div className="text-white text-center">
                                    <h2 className="text-xl font-semibold">{service.name}</h2>
                                    <p>{service.price}</p>
                                </div>
                                <div className="flex justify-center">
                                    <GenericButton white placeholder="Order" />
                                </div>  
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center">No popular services found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}



