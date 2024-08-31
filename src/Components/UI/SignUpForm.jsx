import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export default function SignInForm() {
    return (
        <div className='flex'>
        <div className='flex-shrink-0 w-96 h-full'>
            <img src="/img/Register-Mujer.png" className="h-full w-auto object-cover rounded-bl-[40px] rounded-tl-[40px]" alt="Login Hombre" />
        </div>
        <div className='grid bg-white w-96 gap-4 p-4 place-items-center rounded-tr-[40px] rounded-br-[40px] shadow-lg'>
            <img src="/img/identificador.png" className="h-36" alt="identificador"/>
            <h1 className="text-xl font-bold text-center">Registrarse</h1>
            <SignInputs placeholder={"Usuario"} />
            <SignInputs placeholder={"Correo electronico"} />
            <SignInputs placeholder={"Contraseña"} />
            <SignInputs placeholder={"Confirmar contraseña"} />
            <GenericButton placeholder={"Registrarse"} />
            <a href="/forgot-password" className="text-purple hover:underline text-center">Iniciar sesion</a>
        </div>
        
    </div>
    
    );
}
