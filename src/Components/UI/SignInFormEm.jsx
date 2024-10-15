import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';
import { sha256 } from 'js-sha256';

/**
 * Componente de formulario de inicio de sesión.
 * Permite a los usuarios iniciar sesión con su correo electrónico y contraseña.
 * Solo permite loguear tipos de cuenta específicos (1, 3, 4).
 * Muestra un mensaje especial si el tipo de cuenta es 2.
 */
export function SignInFormEm({ onToggleForm }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [accountTypes, setAccountTypes] = useState([]); // Inicializado como un array vacío
    const navigate = useNavigate(); 

    // Efecto para cargar los tipos de cuenta desde la API al montar el componente
    useEffect(() => {
        const fetchAccountTypes = async () => {
            try {
                const response = await fetch('https://tulookapiv2.vercel.app/api/api/acounttypes');
                if (!response.ok) {
                    throw new Error('Error fetching account types');
                }
                const result = await response.json();

                // Extraer el array de tipos de cuenta de la respuesta
                if (Array.isArray(result.data)) {
                    setAccountTypes(result.data); // Almacena los tipos de cuenta en el estado
                } else {
                    throw new Error('La respuesta de la API no contiene un array de tipos de cuenta');
                }
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };

        fetchAccountTypes(); // Llama a la función para obtener los tipos de cuenta
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Actualiza el estado con los nuevos valores
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la acción predeterminada del formulario
        setError(''); // Resetea el mensaje de error

        const encryptedPassword = sha256(formData.password); // Encripta la contraseña

        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching users');
            }

            const result = await response.json();
            const users = result; // Almacena los usuarios obtenidos

            if (!Array.isArray(users)) {
                throw new Error('La respuesta de la API no contiene un array de usuarios');
            }

            const user = users.find(user => user.email === formData.email);

            if (!user) {
                setError('Correo electrónico no encontrado.');
                return; // Termina la función si no se encuentra el usuario
            }

            if (user.password !== encryptedPassword) {
                setError('Contraseña incorrecta.');
                return; // Termina la función si la contraseña no coincide
            }

            const accountType = accountTypes.find(type => type.id === user.acounttype_id);

            if (!accountType) {
                setError('Tipo de cuenta no encontrado.');
                return; // Termina la función si no se encuentra el tipo de cuenta
            }

            if (accountType.id === 2) {
                setError('Por favor, inicie sesión en el login de usuarios.');
                return; // Termina la función si el tipo de cuenta es 2
            }

            if (![1, 3, 4].includes(accountType.id)) {
                setError('Tipo de cuenta no permitido para el inicio de sesión.');
                return; // Termina la función si el tipo de cuenta no es permitido
            }

            localStorage.setItem('token', result.token);
            localStorage.setItem('email', formData.email); 
            localStorage.setItem('userId', user.id);
            localStorage.setItem('user', JSON.stringify({ email: user.email }));

            navigate('/home'); // Redirige al usuario a la página principal

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setError('Hubo un error con el servidor. Inténtalo más tarde.'); // Maneja errores de la API
        }
    };

    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8"> 
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Login-Mujer.png"
                    className="w-full h-full object-cover rounded-bl-[40px] rounded-tl-[40px]"
                    alt="Login Mujer"
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

                <a href="/login?form=signin" className="text-purple hover:underline text-center">
                    Login Usuario
                </a>
            </div>
        </section>
    );
}