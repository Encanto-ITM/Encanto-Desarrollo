import React from 'react';

export function PopularWorkers({ filteredWorkers, searchTerm }) {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Know Some Workers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredWorkers.length > 0 ? (
                        filteredWorkers.map((worker) => (
                            <div
                                key={worker.id}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-semibold text-center text-gray-700">{worker.name}</h3>
                                <p className="text-center text-gray-500">{worker.profession}</p>
                                <div className="text-center text-yellow-500 mt-2">
                                    ★★★★☆ <span className="text-gray-600">({worker.rating}/5, {worker.jobs} jobs)</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-4 text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis nisi vitae magna.
                                </p>
                                <div className="text-center mt-6">
                                    <button className="bg-[#65439B] text-white py-2 px-6 rounded-full hover:bg-purple-800 transition-colors duration-300">
                                        Choose Worker
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-gray-600">No results found for "{searchTerm}"</p>
                    )}
                </div>
            </div>
        </section>
    );
}
