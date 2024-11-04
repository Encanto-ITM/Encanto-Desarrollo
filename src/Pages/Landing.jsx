import React, { useState } from 'react'; // Importa React y useState
import { HeaderLanding } from "../Components/Landing-components/HeaderLanding.jsx";
import { InfoLanding } from "../Components/Landing-components/InfoLanding.jsx";
import { NavLanding } from "../Components/Landing-components/NavLanding.jsx";
import { ServiceLanding } from "../Components/Landing-components/ServiceLanding.jsx";
import Footer from '../Components/Activity/Footer.jsx';

export default function Landing() {

  return (
      <>
        <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative">
          <NavLanding />
          <HeaderLanding />
          <ServiceLanding />
          <InfoLanding />
          <Footer />
        </div>
      </>
      
    
  );
}
