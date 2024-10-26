import {CartHistory} from '../Components/Cart/CartHistory.jsx';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';

export default function CartList() {

    return (
      
        <>
          <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative ">
            <Nav />
            <CartHistory />
            <Footer />
          </div>
        </>
        
      
    );
  }
  