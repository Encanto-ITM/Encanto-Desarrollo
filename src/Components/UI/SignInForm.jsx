import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export default function SignInForm() {
    return (
        <div className='flex'>
        <div className='grid bg-white w-96 gap-4 p-4 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg'>
            <img src="/img/identificador.png" className="h-36" alt="identificador"/>
            <h1 className="text-xl font-bold text-center">Iniciar Sesión</h1>
            <SignInputs placeholder={"Usuario"} />
            <SignInputs placeholder={"Contraseña"} />
            <a href="/forgot-password" className="text-gray-500 hover:underline text-center">Olvidé mi contraseña</a>
            <GenericButton placeholder={"Iniciar Sesión"} />
            <a href="/register" className="text-black hover:underline text-center">Registrate</a>
            <a href="/forgot-password" className="text-purple hover:underline text-center">Login Emprendedor</a>
        </div>
        <div className='flex-shrink-0 w-96 h-full'>
            <img src="/img/Login-Hombre.png" className="h-full w-auto object-cover rounded-br-[40px] rounded-tr-[40px]" alt="Login Hombre" />
        </div>
    </div>
    
    );
}
