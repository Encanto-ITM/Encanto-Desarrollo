import { HeaderLanding } from "../Components/landing-components/HeaderLanding";
import { InfoLanding } from "../Components/landing-components/InfoLanding";
import { NavLanding } from "../Components/landing-components/NavLanding";
import { ServiceLanding } from "../Components/landing-components/ServiceLanding";
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] max-sm:w-full max-sm:flex max-sm:flex-col relative">
      <nav className="bg-[#65439B] text-white px-8 py-4 flex justify-between items-center relative z-20">
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
          <button className="bg-[#EBEBEB] text-[#65439B] transition duration-500 ease-in-out px-8 py-2 rounded hover:bg-[#f3eded] hover:scale-110">Login</button>
        </ul>
      </nav>

      <div className="grid grid-cols-2 mt-8 max-sm:grid-cols-1 relative z-10">
        <div className="flex-grow flex flex-col items-start justify-center p-8 md:p-16 mx-auto max-w-3xl max-sm:p-4">
          <h1 className="text-[clamp(3rem,_3.50rem,_4rem)] font-bold text-black mb-4 leading-tight">
            Sign up for <br /> get a <br /> Shining Beauty
          </h1>
          <p className="text-black text-[clamp(1rem,_1.25rem,_1.50rem)] mb-8 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
          </p>
          <button className="bg-[#65439B] text-white px-12 py-3 rounded-lg hover:bg-purple-800 text-[clamp(1rem,_1.25rem,_1.50rem)] transition duration-500 ease-in-out hover:bg-[#482d74] transform hover:-translate-y-1 hover:scale-110">
            Sign Up
          </button>
        </div>
        <div>
          <img src="/img/Logo-Landing-Claro.png" alt="" className="w-[80%] ml-8 mt-12" />
        </div>
      </div>
    </>
    
  );
}
