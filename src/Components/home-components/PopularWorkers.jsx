import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export function PopularWorkers({ filteredWorkers }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Know Some Workers</h2>
                {filteredWorkers.length > 0 ? (
                    <Slider {...settings}>
                        {filteredWorkers.map((worker) => (
                            <div key={worker.id} className="bg-white p-10 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-semibold text-center text-gray-700">{worker.name}</h3>
                                <p className="text-center text-gray-500">{worker.profession}</p>
                                <p className="text-gray-600 text-sm mt-4 text-center">
                                As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality.
                                </p>
                                <div className="text-center mt-6">
                                    <button className="bg-purple hover:bg-black text-white py-2 px-6 rounded-full transition-colors duration-300">
                                        Choose Worker
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="text-center text-gray-600">No results found for workers.</p>
                )}
            </div>
        </section>
    );
}
