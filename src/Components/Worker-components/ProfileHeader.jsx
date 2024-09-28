import React from 'react';

export function ProfileHeader() {
  return (
    <div className="relative">
      <img
        className="w-full h-80 object-cover" 
        src="/img/Death Note.jpg"  
        alt="Background"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md text-center w-80 h-72"> 
        <img
          className="w-32 h-32 rounded-full mx-auto" 
          src="/img/Death Note.jpg" 
          alt="Profile"
        />
        <h2 className="text-xl font-semibold mt-4">Pablito Brenes Monge</h2>
        <p className="text-gray-500">pablitobrenes@email.com</p>
      </div>
    </div>
  );
}
