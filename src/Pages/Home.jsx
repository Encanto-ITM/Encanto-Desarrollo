import { useState } from "react";
import { Search } from "../Components/home-components/Search";
import { Services } from "../Components/home-components/Services";
import { PopularServices } from "../Components/home-components/PopularServices";
import { PopularWorkers } from "../Components/home-components/PopularWorkers";
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';

export function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    const popularServices = [
        { id: 1, name: "HairCut", price: "11$", image: "/img/Iconos/Barberia-white.png" },
        { id: 2, name: "Manicure", price: "20$", image: "/img/Iconos/Manicura-white.png" },
        { id: 3, name: "Skin Care", price: "30$", image: "/img/Iconos/SkinCare-white.png" },
        { id: 4, name: "Hair Coloring", price: "50$", image: "/img/Iconos/Estilismo-white.png" },
    ];

    const popularWorkers = [
        { id: 1, image:"img/Pablito-Placeholder.png", name: "Pablito", profession: "Barbero", rating: 4.5, jobs: 300, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality."},
        { id: 2, image:"img/Pablito-Placeholder.png", name: "María", profession: "Estilista", rating: 4.8, jobs: 250, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 3, image:"img/Pablito-Placeholder.png", name: "Luisa", profession: "Manicurista", rating: 4.7, jobs: 150, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 4, image:"img/Pablito-Placeholder.png", name: "Pedro", profession: "Masajista", rating: 4.3, jobs: 120, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 5, image:"img/Pablito-Placeholder.png", name: "Pablito", profession: "Barbero", rating: 4.5, jobs: 300, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 6, image:"img/Pablito-Placeholder.png", name: "María", profession: "Estilista", rating: 4.8, jobs: 250, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 7, image:"img/Pablito-Placeholder.png", name: "Luisa", profession: "Manicurista", rating: 4.7, jobs: 150, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
        { id: 8, image:"img/Pablito-Placeholder.png", name: "Pedro", profession: "Masajista", rating: 4.3, jobs: 120, description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality." },
    ];

    const filteredServices = popularServices.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredWorkers = popularWorkers.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <Nav />
                <main className="p-0">
                    <div className="p-6">
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <Services />
                    </div>
                    <div className="p-0 bg-purple">
                        <PopularServices filteredServices={filteredServices} searchTerm={searchTerm} />
                    </div>
                    <div className="p-6">
                        <PopularWorkers filteredWorkers={filteredWorkers} searchTerm={searchTerm} />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
