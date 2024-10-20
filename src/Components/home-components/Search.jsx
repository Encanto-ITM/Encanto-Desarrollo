export function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className="text-center mb-12 py-16 relative">
            <div className="relative z-10">
                <h1 className="text-6xl font-bold text-gray-800 mb-16">
                    Book trusted <span className='text-purple'>services</span><br /> for you!
                </h1>

                <div className="mt-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="border border-gray-300 rounded-full px-6 py-3 w-1/3 text-lg outline-none focus:ring-2 focus:ring-purple-500 text-center"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

