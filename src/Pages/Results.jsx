import { Search } from "../Components/home-components/Search";
import { Nav } from '../Components/Activity/Nav.jsx';
import { Services } from '../Components/home-components/Services';
import Footer from "../Components/Activity/Footer.jsx";
export function Results() {
    return(
    <div>
        <Nav />
        <Search />
        <Services />
        <Footer/>
    </div>
    )
}