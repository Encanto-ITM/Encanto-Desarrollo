import React, { useEffect, useState } from 'react'; 
import { ProfileHeader } from '../Components/Worker-components/ProfileHeader.jsx';
import { WorkerInfo } from '../Components/Worker-components/WorkerInfo.jsx';
import { useParams } from 'react-router-dom';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import ServicesContainer from '../Components/Worker-components/ServicesContainer.jsx'; 
import Loading from '../Components/Worker-components/Loading'; 

export function WorkerProfile() {
    const { id } = useParams(); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const handleScroll = () => {
            window.scrollTo(0, 0);
            setLoading(false); 
        };

        const timeoutId = setTimeout(handleScroll, 100); 

        return () => clearTimeout(timeoutId); 
    }, []);

    if (loading) {
        return <Loading />; 
    }

    return (
        <div className="mx-auto">
            <Nav />
            <ProfileHeader workerId={id} /> 
            <div className='px-8'>
                <WorkerInfo workerId={id} /> 
                <div className='py-10'>
                    <ServicesContainer ownerId={id} /> {/* Pasando el ownerId */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
