import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export function SignInForm({ onToggleForm }) {
    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8"> 
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden  flex-grow md:block">
                <img
                    src="/img/Login-Hombre.png"
                    className="w-full h-full object-cover rounded-bl-[40px] rounded-tl-[40px]"
                    alt="Login Hombre"
                     loading="lazy"
                />
            </div>
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-6 p-6 place-items-center rounded-tr-[40px] rounded-br-[40px] shadow-lg flex-grow Forms "> 
                <div className="h-36">
                    <img src="/img/identificador.png" className="w-auto h-full mx-auto" alt="identificador" />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Iniciar Sesión</h1> 
                <SignInputs placeholder={"Usuario"} />
                <SignInputs placeholder={"Contraseña"} />
                <a href="/forgot-password" className="text-gray-500 hover:underline text-center">Olvidé mi contraseña</a>
                <GenericButton placeholder={"Iniciar Sesión"} />
                <a onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer">Regístrate</a>
                <a href="/forgot-password" className="text-purple hover:underline text-center">Login Emprendedor</a>
            </div>
        </section>
    );
}
