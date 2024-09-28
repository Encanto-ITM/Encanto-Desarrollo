import React, { useState } from 'react';

export function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Pablito Barber',
      description: 'Expert in beard styling and haircuts',
      link: '#',
      image: '/img/Death Note.jpg',
    },
    {
      id: 2,
      name: 'Pablito Barber',
      description: 'Provides top-notch hair blurring techniques',
      link: '#',
      image: '/img/Death Note.jpg',
    },
    {
      id: 3,
      name: 'Pablito Barber',
      description: 'Passionate about personalized services',
      link: '#',
      image: '/img/Death Note.jpg',
    },
    {
        id: 4,
        name: 'Pablito Barber',
        description: 'Provides top-notch hair blurring techniques',
        link: '#',
        image: '/img/Death Note.jpg',
      },
      {
        id: 5,
        name: 'Pablito Barber',
        description: 'Passionate about personalized services',
        link: '#',
        image: '/img/Death Note.jpg',
      },
      {
        id: 6,
        name: 'Pablito Barber',
        description: 'Provides top-notch hair blurring techniques',
        link: '#',
        image: '/img/Death Note.jpg',
      },
      {
        id: 7,
        name: 'Pablito Barber',
        description: 'Passionate about personalized services',
        link: '#',
        image: '/img/Death Note.jpg',
      },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md">
      <h3 className="text-lg font-semibold">Services Offered</h3>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }} 
        >
          {products.map((product) => (
            
            <div
              key={product.id}
              className="flex-shrink-0 w-1/4 bg-white  shadow-md  mx-2" 
            >
                
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className='p-4'>
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <a href={product.link} className="text-purple-600 mt-4 inline-block">Find out more</a>
            </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-lg z-10">
          &lt;
        </button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-lg z-10">
          &gt;
        </button>
      </div>
    </div>
  );
}
