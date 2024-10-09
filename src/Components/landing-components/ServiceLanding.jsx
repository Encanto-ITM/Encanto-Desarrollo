export function ServiceLanding() {
    return (
        <section className="py-16 bg-gray-100" id="services">
            <div className="container mx-auto text-center">
                <h3 className="text-4xl font-bold mb-6 text-gray-800">Our Services</h3>
                <p className="mb-16 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed p-4">
                    Discover our range of services tailored to enhance your beauty and well-being. We provide personalized treatments and expert advice to help you achieve your beauty goals. Experience the difference with our high-quality offerings designed just for you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button>
                                <img src="/img/Iconos/customer-service.png" alt="" />
                            </button>
                        </div>
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Services</h4>
                        <p className="text-gray-600">
                            Discover our services designed to enhance your beauty and well-being. We offer personalized treatments, expert advice, and high-quality products to help you look and feel amazing.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button>
                                <img src="/img/Iconos/worker.png" alt="" />
                            </button>
                        </div>
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Entrepreneurs</h4>
                        <p className="text-gray-600">
                            We support passionate entrepreneurs looking to stand out in the beauty industry. Join our network to access resources, training, and opportunities that will help you grow your business.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button>
                                <img src="/img/Iconos/dollar.png" alt="" />
                            </button>
                        </div>
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Pricing</h4>
                        <p className="text-gray-600">
                            We offer competitive and affordable plans so that everyone can enjoy our products and services. Check out our pricing list and discover how you can start your journey toward radiant beauty without breaking the bank.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
