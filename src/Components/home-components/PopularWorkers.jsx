import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PopularWorkers({ filteredWorkers }) {
    const navigate = useNavigate();  // Hook para redirigir

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 3, 
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1, 
                    dots: true,
                }
            }
        ]
    };

    const handleFindOutMore = (workerId) => {
        // Navegar al perfil del trabajador seleccionado
        navigate(`/workerprofile/${workerId}`);
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Know Some Workers
                </h2>

                {filteredWorkers.length > 0 ? (
                    <Slider {...settings}>
                        {filteredWorkers.map(worker => (
                            <div key={worker.id} className="relative p-4">
                                <div className="bg-white shadow-lg overflow-hidden">
                                    <img 
                                        src={worker.image} 
                                        alt={worker.name} 
                                        className="w-full h-48 object-cover" 
                                    />
                                    <div className='p-8'>
                                        <h2 className="text-xl font-semibold text-left text-gray-700">
                                            {worker.name}
                                        </h2>
                                        <h3 className="text-left text-gray-500">
                                            {worker.profession}
                                        </h3>
                                        <p>{worker.description}</p>

                                        <div className="text-center mt-4">
                                            <button
                                                className="flex items-center"
                                                onClick={() => handleFindOutMore(worker.id)} // Redirigir al perfil del trabajador
                                            >
                                                <div className="rounded-full bg-purple p-1">
                                                    <ChevronRight className="text-white" />
                                                </div>
                                                <span className="ml-2 text-purple">Find out more</span>
                                            </button>
                                        </div>
                                    </div>
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
