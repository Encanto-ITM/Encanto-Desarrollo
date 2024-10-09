import React from 'react';
import { ProfileHeader } from '../Components/Worker-components/ProfileHeader.jsx';
import { WorkerInfo } from '../Components/Worker-components/WorkerInfo.jsx';
import { useParams } from 'react-router-dom';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';


export function WorkerProfile() {
    const { id } = useParams(); 
    console.log("Worker ID from URL:", id); 

    return (
        <div className="mx-auto">
            <Nav />
            <div className='px-8'>
                <ProfileHeader workerId={id} /> 
                <WorkerInfo workerId={id} /> 
            </div>
            <Footer />
        </div>
    );
}
