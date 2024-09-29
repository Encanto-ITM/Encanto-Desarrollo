export function ServiceLanding(){
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <h3 className="text-4xl font-bold mb-12 text-gray-800">Nuestros Servicios</h3>
            <p className="mb-12 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-32 w-32 bg-gray-300 mx-auto mb-6"></div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Servicios</h4>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-32 w-32 bg-gray-300 mx-auto mb-6"></div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Emprendedores</h4>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-32 w-32 bg-gray-300 mx-auto mb-6"></div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Precios</h4>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
                </p>
                </div>
            </div>
            </div>
      </section>
    );
}