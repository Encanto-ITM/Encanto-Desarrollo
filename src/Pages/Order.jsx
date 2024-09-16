import React from 'react';
import {Nav} from  '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import GenericButton from '../Components/UI/GenericButton.jsx';

export function Order({ Categoria }) {
    return (
        <>
            <Nav />

            <div className="text-center w-full p-10 md:p-20 font-bold">
                <h1 className="text-2xl md:text-4xl mb-4">Reserva tu cita</h1>
                <h2 className="text-xl md:text-3xl mb-8">{Categoria} Corte de pelo</h2>
                <h3 className="text-lg md:text-xl">Elige tu fecha</h3>
            </div>
            
            <div className="flex justify-center mt-10 mb-20">
                <button className=" font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/3 h-12 rounded-xl mt-3">Completar Orden</button>
            </div>

            <Footer />

        </>
    );
}
