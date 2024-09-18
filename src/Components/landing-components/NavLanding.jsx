import React, { useState } from 'react';

export function NavLanding(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    return(
        <nav className="bg-[#65439B] text-white px-8 py-1 flex justify-between items-center relative z-20">
        <div className="flex items-center">
          <a href="#"><img src="/img/Logo-Landing.png" alt="TuLook Logo" className="h-16 w-30 mr-2 transition duration-500 hover:scale-110" /></a>
        </div>

        <button
          className="block lg:hidden text-white z-30"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <ul
          className={`flex-col lg:flex-row text-lg space-x-4 gap-8 items-center lg:flex transition-all duration-500 ${
            isMenuOpen ? 'fixed inset-0 bg-[#65439B] flex justify-center items-center flex-col text-center' : 'hidden'
          }`}
        >
          <li className="transition duration-500 hover:scale-90"><a href="#">Services</a></li>
          <li className="transition duration-500 hover:scale-90"><a href="#">Community</a></li>
          <li className="transition duration-500 hover:scale-90"><a href="#">About Us</a></li>
          <li className="transition duration-500 hover:scale-90"><a href="#">Contact Us</a></li>
          <li className="transition duration-500 hover:scale-90"><a href="#">Blog</a></li>
          <a href='/Login' className="bg-[#EBEBEB] text-[#65439B] transition duration-500 ease-in-out px-8 py-2 rounded hover:bg-[#f3eded] hover:scale-110">Login</a>
        </ul>
      </nav>

    );
}