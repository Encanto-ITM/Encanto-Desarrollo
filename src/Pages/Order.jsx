import React from 'react';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import ServiceCard from '../Components/UI/ServiceCard.jsx';8
import { Calendario } from '../Components/UI/Calendario.jsx';


export function Order() {
    return (
        <>
            <Nav />

            <div className="text-center w-full p-10 font-bold">
                <h1 className="text-2xl md:text-4xl">
                    Reserva tu cita para obtener <br />
                    una <span className="text-purple">Belleza</span> brillante
                </h1>
            </div>

            <div className="flex flex-row gap-4 p-10">
                <div className="flex flex-col gap-4 w-1/3">
                    <ServiceCard serviceName={`Hair Cut`} />
                    <ServiceCard serviceName={`Cortes SA`} />
                </div>
                <div className="w-2/3 bg-purple flex items-center justify-center p-4 rounded-xl">
                    <Calendario />
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <h1 className="font-bold">Total a pagar: 100$</h1>
            </div>
            <div className="flex justify-center mt-10 mb-20">
            <button className=" font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/3 h-12 rounded-xl mt-3">Completar Orden</button>
            </div>

            <Footer />
        </>
    );
}


