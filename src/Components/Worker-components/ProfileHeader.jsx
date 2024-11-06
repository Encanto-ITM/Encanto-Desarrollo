import React from 'react';
import { useLocation } from 'react-router-dom';

export function ProfileHeader() {
  const location = useLocation();
  const { worker } = location.state || {};

  if (!worker) {
    return <p>No worker data found</p>;
  }

  return (
    <div className="relative">
      <img
        className="w-full h-80 object-cover"
        src={worker.headerphoto || 'https://picsum.photos/800/400'}
        alt="header photo"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-white p-8 rounded-lg shadow-md text-center w-80 h-72">
        <img
          className="w-32 h-32 rounded-full mx-auto border border-gray-300"
          src={worker.profilephoto || 'https://picsum.photos/800/800'}
          alt={`${worker.name} ${worker.lastname}`}
        />
        <h2 className="text-xl font-semibold mt-4">{worker.name} {worker.lastname}</h2>
        <p className="text-gray-500">{worker.email}</p>
      </div>
    </div>
  );
}
