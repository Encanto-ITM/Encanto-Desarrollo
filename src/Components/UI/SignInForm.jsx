import React, { useState } from 'react';
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';
import { sha256 } from 'js-sha256';

export function SignInForm({ onToggleForm }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        const encryptedPassword = sha256(formData.password);

        try {
            
            const response = await fetch('https://tulook-api.vercel.app/api/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching users');
            }

            const result = await response.json();

            console.log('Resultado de la API:', result);

            const users = result.data;

            if (!Array.isArray(users)) {
                throw new Error('La respuesta de la API no contiene un array de usuarios');
            }

            const user = users.find(user => user.email === formData.email);

            if (!user) {
                setError('Correo electrónico no encontrado.');
                return;
            }

            if (user.password !== encryptedPassword) {
                setError('Contraseña incorrecta.');
                return;
            }

            console.log('Login exitoso:', user);
            window.location.href = '/Home';

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setError('Hubo un error con el servidor. Inténtalo más tarde.');
        }
    };

    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8"> 
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Login-Hombre.png"
                    className="w-full h-full object-cover rounded-bl-[40px] rounded-tl-[40px]"
                    alt="Login Hombre"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-6 p-6 place-items-center rounded-tr-[40px] rounded-br-[40px] shadow-lg flex-grow Forms"> 
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Iniciar Sesión</h1> 
                
                <SignInputs
                    placeholder={"Correo electrónico"} 
                    name="email"
                    type="email"
                    onChange={handleChange}
                />
                <SignInputs
                    placeholder={"Contraseña"}
                    name="password"
                    type="password"
                    onChange={handleChange}
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <a href="/resetpassword" className="text-gray-500 hover:underline text-center">
                    Olvidé mi contraseña
                </a>

                <GenericButton
                    type="button"
                    onClick={handleSubmit}
                    placeholder="Iniciar Sesión"
                />

                <div onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer" role='button'>
                    
                    Regístrate
                
                </div>

                <a href="/loginem?form=signin" className="text-purple hover:underline text-center">
                    Login Emprendedor
                </a>
            </div>
        </section>
    );
}
