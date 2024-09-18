import { HeaderLanding } from "../Components/landing-components/HeaderLanding";
import { InfoLanding } from "../Components/landing-components/InfoLanding";
import { NavLanding } from "../Components/landing-components/NavLanding";
import { ServiceLanding } from "../Components/landing-components/ServiceLanding";

export default function Landing() {

  return (
    <>
      <div className="min-h-screen bg-[#EBEBEB] max-sm:w-full max-sm:flex max-sm:flex-col relative">
        <NavLanding />

        <HeaderLanding />
        <ServiceLanding />
        <InfoLanding />

      </div>
    </>
    
  );
}