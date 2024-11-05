import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export function SignInForm({ onToggleForm }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [accountTypes, setAccountTypes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAccountTypes = async () => {
            try {
                const response = await fetch('https://tulookapiv2.vercel.app/api/api/acounttypes');
                if (!response.ok) {
                    throw new Error('Error fetching account types');
                }
                const result = await response.json();

                if (Array.isArray(result.data)) {
                    setAccountTypes(result.data);
                } else {
                    throw new Error('La respuesta de la API no contiene un array de tipos de cuenta');
                }
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };

        fetchAccountTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Por favor, rellena todos los campos.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Correo electrónico o contraseña incorrectos.');
                } else {
                    throw new Error('Error en la solicitud de login.');
                }
            }

            const result = await response.json();


            localStorage.setItem('token', result.token);
            localStorage.setItem('email', formData.email);
            //localStorage.setItem('userId', result.user.id);
            //localStorage.setItem('user', JSON.stringify(result.user));

           
            navigate('/home');

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setError(error.message || 'Hubo un error con el servidor. Inténtalo más tarde.');
        }
    };

    return (
        <section className="flex flex-col md:flex-row w-full h-screen">
            <div className="flex w-full md:w-1/2 h-full overflow-hidden hidden md:block">
                <img
                    src="/img/Login.jpg"
                    className="w-full h-full object-cover"
                    alt="Login Hombre"
                    loading="lazy"
                />
            </div>
    
            <div className="flex flex-col w-full md:w-1/2 h-full bg-white gap-4 p-12 place-items-center overflow-y-auto">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
    
                <h1 className="text-xl font-bold text-center mb-4">Iniciar Sesión</h1>
                <div className='w-3/4 flex flex-col gap-8'> 
                    <SignInputs
                        placeholder={"Correo electrónico"}
                        name="email"
                        type="email"
                        onChange={handleChange}
                        className="" 
                    />
                    <SignInputs
                        placeholder={"Contraseña"}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className="" 
                    />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


                <div className='w-3/5 flex flex-col gap-4'> 
                    <GenericButton
                        type="button"
                        onClick={handleSubmit}
                        placeholder="Iniciar Sesión"
                        className="mt-6 h-12" 
                    />
                </div>
                <a href="/resetpassword" className="text-black hover:underline text-center cursor-pointer">
                    Olvidé mi contraseña
                </a>
                <br />

                <div className="text-black text-center">
                    <h2 className="mb-4 text-lg font-bold">Regístrate</h2>
                    <div className="flex items-center justify-center gap-8">
                        <div 
                            onClick={() => onToggleForm('user')} 
                            className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-[rgba(42,29,69,0.3)] p-2 rounded"
                        >
                            <img 
                                src="/img/Iconos/Usuario_2.png" 
                                alt="Usuario" 
                                className="w-12 h-12 transition-transform transform hover:scale-110" 
                            />
                            <span className="mt-2">Usuario</span>
                        </div>
                        <div 
                            onClick={() => onToggleForm('emprendedor')} 
                            className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-[rgba(42,29,69,0.3)] p-2 rounded"
                        >
                            <img 
                                src="/img/Iconos/Emprendedor.png" 
                                alt="Emprendedor" 
                                className="w-12 h-12 transition-transform transform hover:scale-110" 
                            />
                            <span className="mt-2">Emprendedor</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );



}