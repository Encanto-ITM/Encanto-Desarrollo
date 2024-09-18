import { useState } from "react";
import { Search } from "../Components/home-components/Search";
import { Services } from "../Components/home-components/Services";
import { PopularServices } from "../Components/home-components/PopularServices";
import { PopularWorkers } from "../Components/home-components/PopularWorkers";

export function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    const popularServices = [
        { id: 1, name: "HairCut", price: "11$", image: "/img/Death Note.jpg" },
        { id: 2, name: "Manicure", price: "20$", image: "/img/Death Note.jpg" },
        { id: 3, name: "Skin Care", price: "30$", image: "/img/Death Note.jpg" },
        { id: 4, name: "Hair Coloring", price: "50$", image: "/img/Death Note.jpg" },
        { id: 5, name: "HairCut", price: "11$", image: "/img/Death Note.jpg" },
        { id: 6, name: "Manicure", price: "20$", image: "/img/Death Note.jpg" },
        { id: 7, name: "Skin Care", price: "30$", image: "/img/Death Note.jpg" },
        { id: 8, name: "Hair Coloring", price: "50$", image: "/img/Death Note.jpg" },
    ];

    const popularWorkers = [
        { id: 1, name: "Pablito", profession: "Barbero", rating: 4.5, jobs: 300 },
        { id: 2, name: "María", profession: "Estilista", rating: 4.8, jobs: 250 },
        { id: 3, name: "Luisa", profession: "Manicurista", rating: 4.7, jobs: 150 },
        { id: 4, name: "Pedro", profession: "Masajista", rating: 4.3, jobs: 120 },
        { id: 5, name: "Pablito", profession: "Barbero", rating: 4.5, jobs: 300 },
        { id: 6, name: "María", profession: "Estilista", rating: 4.8, jobs: 250 },
        { id: 7, name: "Luisa", profession: "Manicurista", rating: 4.7, jobs: 150 },
        { id: 8, name: "Pedro", profession: "Masajista", rating: 4.3, jobs: 120 },
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
                <main className="p-6">
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Services />
                    <PopularServices filteredServices={filteredServices} searchTerm={searchTerm} />
                    <PopularWorkers filteredWorkers={filteredWorkers} searchTerm={searchTerm} />
                </main>
            </div>
        </>
    );
}
