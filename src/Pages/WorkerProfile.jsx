import React from 'react';
import { ProfileHeader } from '../Components/Worker-components/ProfileHeader.jsx';
import { WorkerInfo } from '../Components/Worker-components/WorkerInfo.jsx';
import { useState } from "react";
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { PopularWorkers } from "../Components/home-components/PopularWorkers";

export function WorkerProfile() {
  const [searchTerm, setSearchTerm] = useState("");
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


const filteredWorkers = popularWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.profession.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className=" mx-auto ">
         <Nav />
        <div className='px-8'>
      <ProfileHeader />
      <WorkerInfo />
      <div className="p-6">
                        <PopularWorkers filteredWorkers={filteredWorkers} searchTerm={searchTerm} />
        </div>
      </div>
      <Footer />

    </div>
  );
}