import React, { useState } from 'react';
import UserProfile from '../UI/UserProfile';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuClasses = `
    flex-col lg:flex-row text-lg space-x-4 gap-8 items-center lg:flex transition-all duration-500 ${
      isOpen ? 'fixed inset-0 bg-[#65439B] flex justify-center items-center flex-col text-center' : 'hidden'
    }
  `;

  const profileImage = '/img/Death_Note.jpg';

  return (
    <nav className="bg-[#65439B] text-white px-8 py-4 flex justify-between items-center relative z-20">
      <div className="flex items-center">
        <a href="#">
          <img src="/img/Logo-Landing.png" alt="TuLook Logo" className="h-16 w-30 mr-2 transition duration-500 hover:scale-110" />
        </a>
      </div>

      <button className="block lg:hidden text-white z-30" onClick={toggleMenu}>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      <ul className={menuClasses}>
        <li className="transition duration-500 hover:scale-90">
          <a href="#">Services</a>
        </li>
        <li className="transition duration-500 hover:scale-90">
          <a href="#">Community</a>
        </li>
        <li className="transition duration-500 hover:scale-90">
          <a href="#">About Us</a>
        </li>
        <li className="transition duration-500 hover:scale-90">
          <a href="#">Contact Us</a>
        </li>
        <li className="transition duration-500 hover:scale-90">
          <a href="#">Blog</a>
        </li>
        <li className="transition duration-500 hover:scale-90">
          <a href="#" onClick={openModal} className="flex gap-4 items-center">
            <img className="w-14 h-12 rounded-full" src={profileImage} alt="Profile picture" />
          </a>
        </li>
      </ul>

      <UserProfile open={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
