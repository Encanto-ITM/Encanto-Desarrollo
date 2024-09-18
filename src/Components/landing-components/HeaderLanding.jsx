export function HeaderLanding (){
    return(
        <div className="grid bg-[#EBEBEB] grid-cols-2 mt-8 max-sm:grid-cols-1 relative z-10 mb-16">
            <div className="flex-grow flex flex-col items-start justify-center p-8 md:p-16 mx-auto max-w-3xl max-sm:p-4">
            <h1 className="text-[clamp(3rem,_3.50rem,_4rem)] font-bold text-black mb-4 leading-tight">
                Sign up for <br /> get a <br /> Shining Beauty
            </h1>
            <p className="text-black text-[clamp(1rem,_1.25rem,_1.50rem)] mb-8 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at diam eu tortor lobortis molestie.
            </p>
            <a href='/Home' className="bg-[#65439B] text-white px-16 py-3 rounded-lg hover:bg-purple-800 text-[clamp(1rem,_1.25rem,_1.50rem)] transition duration-500 ease-in-out hover:bg-[#482d74] transform hover:-translate-y-1 hover:scale-110">
                Sign Up
            </a>
            </div>
            <div>
            <img src="/img/Logo-Landing-Claro.png" alt="" className="w-[80%] ml-8 mt-12" />
            </div>
        </div>
    );
}