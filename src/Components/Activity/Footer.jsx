export default function Footer() {
    return (
        <footer className="bg-[#494949] text-white p-12" id="footer">
            <div className="container mx-auto flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Servicios</h2>
                    <ul>
                        <li><a href="#discover" className="hover:underline">Descubre</a></li>
                        <li><a href="#all-services" className="hover:underline">Todos los servicioss</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Compañia</h2>
                    <ul>
                        <li><a href="/aboutus" className="hover:underline">Acerca de nosotros</a></li>
                        <li><a href="#careers" className="hover:underline">Carreras</a></li>
                    </ul>
                </div>

                <div className="w-full lg:w-1/3 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Siguenos</h2>
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
