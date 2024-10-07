export default function Footer() {
    return (
        <footer className="bg-light-gray text-white p-12" id="footer">
            <div className="container mx-auto flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Services</h2>
                    <ul>
                        <li><a href="#discover" className="hover:underline">Discover</a></li>
                        <li><a href="#services-by-city" className="hover:underline">Services By City</a></li>
                        <li><a href="#services-nearby" className="hover:underline">Services Nearby</a></li>
                        <li><a href="#all-services" className="hover:underline">All Services</a></li>
                        <li><a href="#elite-workers" className="hover:underline">Elite Workers</a></li>
                        <li><a href="#help" className="hover:underline">Help</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Company</h2>
                    <ul>
                        <li><a href="#about-us" className="hover:underline">About Us</a></li>
                        <li><a href="#careers" className="hover:underline">Careers</a></li>
                        <li><a href="#do-not-sell" className="hover:underline">Do Not Sell My Personal Information</a></li>
                    </ul>
                </div>

                <div className="w-full lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
                    <ul>
                        <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
                        <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
                        <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
                        <li><a href="https://linkedin.com" className="hover:underline">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm">© 2023 YourLook. All rights reserved.</p>
            </div>
        </footer>
    );
}
