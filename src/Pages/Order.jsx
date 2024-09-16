import React from 'react';
import {Nav} from  '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import GenericButton from '../Components/UI/GenericButton.jsx';

export function Order({ Emprendedor, Servicio }) {
    return (
        <>
            <Nav />

            <div className="text-center w-full p-10 font-bold">
            <h1 className="text-2xl md:text-4xl">
                Reserva tu cita para obtener <br/>
                una <span className="text-purple">Belleza</span> brillante
            </h1> 
            </div>
            
                    <div className="flex flex-row gap-4 p-10">
            <div className='flex flex-col gap-4 w-1/3'>
                <section className='flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl gap-4'>
                    <img className='h-auto object-contain' src="/img/Barberia.png" alt="service" />
                    <h2 className="text-purple text-center">{Servicio}Hair Cut</h2>
                </section>
                <section className='flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl gap-4'>
                    <img className=' h-auto object-contain' src="/img/Barberia.png" alt="service" />
                    <h2 className="text-purple text-center">{Servicio}Cortes SA</h2>
                </section>
            </div>
            <div className='w-2/3 bg-purple flex items-center justify-center p-4 rounded-xl'>
                <h1 className="text-white text-2xl">Calendario</h1>
            </div>
        

            </div>
            <div className='flex justify-center mt-6'>
                <h1 className='weight-bold'>Total a pagar: 100$</h1>
            </div>
            <div className="flex justify-center mt-10 mb-20">
                <button className=" font-bold flex items-center justify-center bg-purple transition duration-500 hover:scale-110 text-white p-2 w-1/3 h-12 rounded-xl mt-3">Completar Orden</button>
            </div>

            <Footer />

        </>
    );
}
