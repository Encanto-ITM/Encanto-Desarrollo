import React from 'react';
import ServicesCard from './ServicesCard';

export default function ServicesContainer() {
    const services = [
        {
            id: 1,
            name: "Pablito",
            description: "As a professional barber, my passion for styling and shaving goes beyond any conventional techniques. Each client who passes through my chair receives a unique, tailored experience, meticulously personalized to their style and personality.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Marta's Hair Studio",
            description: "Providing personalized hair services for over 10 years, focusing on hair health and style.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Grooming by Tom",
            description: "Specializing in men's grooming, offering a wide range of services from haircuts to shaves.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Jane's Nail Spa",
            description: "A relaxing experience with a variety of nail treatments and designs to choose from.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "Wellness Massage",
            description: "Experience the ultimate relaxation with our massage services tailored to your needs.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            name: "Beauty by Sara",
            description: "Expert beauty treatments with a focus on skincare and makeup, ensuring you look your best.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 7,
            name: "Fit and Fabulous",
            description: "Personal training and fitness coaching to help you achieve your health goals.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 8,
            name: "Chic Boutique",
            description: "Stylish clothing and accessories to elevate your fashion game.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 9,
            name: "Yoga Harmony",
            description: "Yoga classes designed for all levels to promote relaxation and well-being.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 10,
            name: "Gourmet Catering",
            description: "Custom catering services for events, focusing on fresh and seasonal ingredients.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 11,
            name: "Pet Grooming",
            description: "Professional grooming services for your furry friends to keep them looking and feeling great.",
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 12,
            name: "Artistic Photography",
            description: "Capturing moments with artistic flair for weddings, events, and portraits.",
            imageUrl: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="overflow-y-auto h-[48rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map(service => (
                    <div key={service.id} className="flex-shrink-0">
                        <ServicesCard service={service} />
                    </div>
                ))}
            </div>
        </div>
    );
}
