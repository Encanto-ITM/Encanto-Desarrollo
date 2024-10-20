import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import UserProfile from '../UI/UserProfile';
import { fetchUserData } from '../hooks/userData';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true); 
  const navigate = useNavigate(); // Inicializa useNavigate

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuClasses = `
    flex-col lg:flex-row text-lg space-x-4 gap-8 items-center lg:flex transition-all duration-500 ${isOpen ? 'fixed inset-0 bg-purple flex justify-center items-center flex-col text-center' : 'hidden'}
  `;

  const getUserData = async () => {
    const user = await fetchUserData();
    setUserData(user);
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const handleServiceClick = (event) => {
    event.preventDefault(); 
    navigate(`/results/1`); 
  };

  return (
    <nav className="bg-purple text-white px-8 py-1 flex justify-between items-center relative z-20">
      <div className="flex items-center">
        <a href='/home'>
          <img
            src="/img/Logo-Landing.png"
            alt="TuLook Logo"
            className="h-16 w-30 mr-2 transition duration-500 hover:scale-110"
          />
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
        <li className="transition duration-500 hover:scale-110">
          <a onClick={handleServiceClick}>Services</a>
        </li>
        <li className="transition duration-500 hover:scale-110">
          <a href="/aboutus">About Us</a>
        </li>
        <li className="transition duration-500 hover:scale-110">
          <a href="#">Contact Us</a>
        </li>
        <li className="transition duration-500 hover:scale-110">
          <a href="#" onClick={openModal} className="flex items-center justify-center focus:outline-none gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full transition-transform hover:scale-110">
                {isImageLoading && (
                  <img
                    src="/img/placeholder.jpg" 
                    className="object-cover w-full h-full"
                    alt="loading"
                  />
                )}
                <img
                  src={userData?.profilephoto || '/img/Death_Note.jpg'}
                  className={`object-cover w-full h-full ${isImageLoading ? 'hidden' : ''}`}
                  alt="avatar"
                  onLoad={() => setIsImageLoading(false)} 
                  onError={() => setIsImageLoading(false)} 
                />
              </div>
            </div>
          </a>
        </li>
      </ul>

      <UserProfile open={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
