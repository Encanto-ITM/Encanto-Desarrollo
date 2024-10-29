import React, { useState } from 'react';
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';


export function SignUpForm({ onToggleForm }) { 
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
       
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        setFormData({ ...formData, [name]: newValue });
    };

    const validateForm = (data) => {
        let formErrors = {};
        if (!data.name) formErrors.name = "El nombre es requerido.";
        if (!data.lastname) formErrors.lastname = "El apellido es requerido.";
        if (!data.email) formErrors.email = "El correo electrónico es requerido.";
        if (!data.password) formErrors.password = "La contraseña es requerida.";
        if (data.password !== data.password_confirmation) {
            formErrors.password_confirmation = "Las contraseñas no coinciden.";
        }
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const { password_confirmation, ...formDataToSubmit } = formData;

        console.log('Datos del formulario antes de enviar:', formDataToSubmit);

        fetch('https://tulookapiv2.vercel.app/api/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSubmit),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Error al registrarse.');
            }
        })
        .then(data => {
            console.log('Éxito:', data);
          
            onToggleForm();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <section className="flex flex-col md:flex-row w-full h-screen max-w-none overflow-hidden">
            <div className="flex flex-col w-full bg-white gap-4 p-6 place-items-center shadow-lg flex-grow">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Registrarse</h1>
                <div className='w-3/4 flex flex-col gap-4'>
                <SignInputs 
                    placeholder="Nombre" 
                    name="name" 
                    onChange={handleChange} 
                />
                {submitted && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                
                <SignInputs 
                    placeholder="Apellido" 
                    name="lastname"
                    onChange={handleChange} 
                />
                {submitted && errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                
                <SignInputs 
                    placeholder="Correo electrónico" 
                    name="email" 
                    type="email"
                    onChange={handleChange} 
                />
                {submitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                
                <SignInputs 
                    placeholder="Contraseña" 
                    name="password" 
                    type="password" 
                    onChange={handleChange} 
                />
                {submitted && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                
                <SignInputs 
                    placeholder="Confirmar contraseña" 
                    name="password_confirmation" 
                    type="password" 
                    onChange={handleChange} 
                />
                {submitted && errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                </div>
                <div className='w-3/5 flex flex-col gap-4'> 
                <GenericButton 
                    type="button" 
                    onClick={handleSubmit} 
                    placeholder="Registrarse" 
                    className='mt-6 h-12'
                />
                </div>
                <div onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer" role='button'>
                    Iniciar Sesión
                </div>
            </div>
            
            <div className="flex w-full max-h-screen overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Register.jpg"
                    className="w-full h-full object-cover"
                    alt="Register Mujer"
                    loading="lazy"
                />
            </div>
        </section>
    );
    
    }