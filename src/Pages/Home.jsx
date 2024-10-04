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

    const getWorkers = async () => {
        const response = await fetch('https://tulook-api.vercel.app/api/api/users');
        const data = await response.json();
        const[setWorkers, workers] = useState([]);
        setWorkers(data);
        return data;
    };

    useEffect(() => {
        getActivities();
    }, []);

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
