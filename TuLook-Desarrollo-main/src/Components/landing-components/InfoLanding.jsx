export function InfoLanding(){
    return(
        <div className="flex flex-col h-[50rem] md:flex-row bg-[#EBEBEB] shadow-lg overflow-hidden mb-16">

            <div className="md:w-1/2">
            <img
                src="/img/Register-Mujer.png"
                alt="Belleza Brillante"
                className="h-full w-full object-cover"
            />
            </div>
            
            <div className="md:w-1/2 bg-purple text-white p-16 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-bold leading-snug mb-6">
                Regístrate para obtener una <span className="text-purple-300">Belleza Brillante</span>
            </h2>
            <p className="text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
            </p>
            <p className="text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
            </p>
            <p className="text-lg leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="bg-white text-purple font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Read More
            </button>
            </div>
        </div>
    );
}