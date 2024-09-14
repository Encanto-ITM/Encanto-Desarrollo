import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export function SignUpForm({ onToggleForm }) {
    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8 overflow-hidden">
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-4 p-6 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg flex-grow Forms">
                <div className="h-36">
                    <img src="/img/identificador.png" className="w-auto h-full mx-auto" alt="identificador" />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Registrarse</h1>
                <SignInputs placeholder={"Usuario"} />
                <SignInputs placeholder={"Correo electrónico"} />
                <SignInputs placeholder={"Contraseña"} />
                <SignInputs placeholder={"Confirmar contraseña"} />
                <GenericButton placeholder={"Registrarse"} />
                <a onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer ">Iniciar Sesión</a>
            </div>
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden  flex-grow ">
                <img
                    src="/img/Register-Mujer.png"
                    className="w-full h-full object-cover rounded-tr-[40px] rounded-br-[40px]"
                    alt="Register Mujer"
                     loading="lazy"
                />
            </div>
        </section>
    );
}
