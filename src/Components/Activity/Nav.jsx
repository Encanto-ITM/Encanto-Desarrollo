import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import UserProfile from '../UI/UserProfile';
import { fetchUserData } from '../hooks/userData';
import { useCart } from '../Cart/CartContext';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();
  const { cart } = useCart();

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getUserData = async () => {
    const user = await fetchUserData();
    setUserData(user);
  };

  useEffect(() => {
    getUserData();
    const interval = setInterval(() => {
      getUserData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (event) => {
    event.preventDefault();
    navigate(`/results/1`);
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    navigate(`/aboutus`);
  };

  const handleCartClick = () => {
    navigate('/cartlist');
  };

  const handleContactClick = () => {
    navigate('/contactus');
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <nav className="bg-purple text-white px-8 py-1 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center">
        <img
          src="/img/Logo-Landing.png"
          alt="TuLook Logo"
          className="h-16 w-30 mr-2 transition duration-500 hover:scale-110 cursor-pointer"
          onClick={handleLogoClick}
        />
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

      <ul className={`flex flex-col lg:flex-row text-lg items-center lg:justify-center gap-8 transition-all duration-500 ${isOpen ? 'fixed inset-0 bg-purple flex justify-center items-center flex-col text-center' : 'hidden lg:flex'}`}>
        <li className="transition duration-500 hover:scale-110 cursor-pointer">
          <a onClick={handleServiceClick}>Servicios</a>
        </li>
        <li className="transition duration-500 hover:scale-110 cursor-pointer">
          <a onClick={handleAboutClick}>Nosotros</a>
        </li>
        <li className="transition duration-500 hover:scale-110 cursor-pointer">
          <a onClick={handleContactClick}>Contáctanos</a>
        </li>
        <li className="transition duration-500 hover:scale-110">
          <a href="#" onClick={handleCartClick} className="flex items-center justify-center focus:outline-none gap-4">
            <div className="relative flex items-start">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red text-white rounded-full w-4 h-4 flex items-center justify-center text-xs transform translate-x-1 translate-y-1">
                  {cart.length}
                </span>
              )}
            </div>
          </a>
        </li>
        <li className="transition duration-500 hover:scale-110">
          <a href="#" onClick={openModal} className="flex items-center justify-center focus:outline-none gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full transition-transform hover:scale-110">
                {isImageLoading && (
                  <img
                    src="https://via.placeholder.com/150/cccccc/ffffff?text=Loading" 
                    className="object-cover w-full h-full"
                    alt="Cargando..."
                  />
                )}
                <img
                  src={userData?.profilephoto ? `${userData.profilephoto}?t=${new Date().getTime()}` : 'https://via.placeholder.com/150/cccccc/ffffff?text=Loading'}
                  className={`object-cover w-full h-full ${isImageLoading ? 'hidden' : ''}`}
                  alt="Foto de perfil"
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
