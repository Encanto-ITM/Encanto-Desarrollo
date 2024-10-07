import React from 'react';
import { ProfileHeader } from '../Components/Worker-components/ProfileHeader.jsx';
import { WorkerInfo } from '../Components/Worker-components/WorkerInfo.jsx';
import { useParams } from 'react-router-dom';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';

export function WorkerProfile() {
    const { id } = useParams(); // Extrae el id de la URL
    console.log("Worker ID from URL:", id); // Añade este console.log para verificar

    return (
        <div className="mx-auto">
            <Nav />
            <div className='px-8'>
                <ProfileHeader workerId={id} /> {/* Asegúrate de pasar el id */}
                <WorkerInfo workerId={id} /> {/* Asegúrate de pasar el id */}
            </div>
            <Footer />
        </div>
    );
}
