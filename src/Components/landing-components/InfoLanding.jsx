export function InfoLanding() {
    return (
        <div className="flex flex-col md:flex-row bg-[#EBEBEB] shadow-lg overflow-hidden mb-16 rounded-lg" id="info">
           
            <div className="md:w-1/2">
                <img
                    src="/img/Register-Mujer.png"
                    alt="Brilliant Beauty"
                    className="h-full w-full object-cover" 
                />
            </div>

            <div className="md:w-1/2 bg-purple text-white p-8 md:p-16 flex flex-col justify-center space-y-16">
                <h2 className="text-4xl font-bold leading-snug mb-4">
                    Register for a <span className="text-purple-300">Brilliant Beauty</span>
                </h2>
                <p className="text-lg leading-relaxed">
                    Join our community and discover how our products can enhance your beauty. With unique and effective formulas, you’re just a step away from looking radiant!
                </p>
                <p className="text-lg leading-relaxed">
                    Don’t wait any longer. Register now and start your journey towards brilliant, healthy beauty. We can’t wait to see you!
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    Thousands have already transformed their beauty routines with us. Join them and experience the difference.
                </p>
               
                <button className="bg-white text-purple font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 mt-8">
                    Learn More
                </button>
            </div>
        </div>
    );
}
