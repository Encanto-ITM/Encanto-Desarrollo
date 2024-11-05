export function ServiceAboutUs(){
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1 px-6">
                <h3 className="text-4xl font-bold mb-12 text-gray-800">Quiénes Somos</h3>
                <p className="mb-12 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed text-center text-justify">
                    Somos un equipo de compañeros de carrera de Informatica y Tecnología Multimedia de la Universidad de Costa Rica. Nuestro Proyecto TuLook llegó producto de un curso de carrera en el cuál se propusieron ideas para desarrollar como equipo. La idea de esta Aplicación nos llamó la atención y como equipo se propusieron ideas entre todos, las cuáles fueron enriqueciendo el proyecto.
                    Hemos creado TuLook para ti, para que te acompañe en tú camino hacia la belleza al alcance de un click como nuestro lema lo menciona, con esta App tendrás la facilidad de tener cualquier servicio de belleza y salud con solo buscar en nuestra Aplicación.
                </p>
                <br />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/JuanCamacho.png" 
                    alt="Juan G. Camacho Sanchez" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Juan G. Camacho Sanchez</h4>
                <p className="text-gray-600">
                        Scrum Master - Developer
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/EstefaniaJimenez.png" 
                    alt="Estefanía Jiménez Cordero" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Estefanía Jiménez Cordero</h4>
                <p className="text-gray-600">
                        Designer - QA
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/KeylerIabarra.png" 
                    alt="Keyler Ibarra Carvajal" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Keyler Ibarra Carvajal</h4>
                <p className="text-gray-600">
                        Delivery Management - Developer
                </p>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/IanMiranda.png" 
                    alt="Ian Miranda Castellón" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Ian Miranda Castellón</h4>
                <p className="text-gray-600">
                        Developer - Technical Lead
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/EddyChaves.png" 
                    alt="Eddy Chaves Rojas" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Eddy Chaves Rojas</h4>
                <p className="text-gray-600">
                        Developer - Architect
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/RobertoEscobar.png" 
                    alt="Roberto Escobar Aguero" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Roberto Escobar Aguero</h4>
                <p className="text-gray-600">
                        Product Manager
                </p>
                </div>
            </div>
            </div>
      </section>
    );
}