import { Nav} from "../Components/Activity/Nav.jsx";
import { ServiceAboutUs } from "../Components/aboutus-components/ServiceAboutUs.jsx";
import Footer from '../Components/Activity/Footer.jsx';

export default function AboutUs() {

  return (
    
      <>
        <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative">
          <Nav />
          <ServiceAboutUs />
          <Footer />
        </div>
      </>
      
    
  );
}
