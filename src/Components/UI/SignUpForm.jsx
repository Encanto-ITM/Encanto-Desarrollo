import React, { useState } from 'react';
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';
import { sha256 } from 'js-sha256'; 

export function SignUpForm({ onToggleForm }) {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        contact_number: '0',
        contact_public: '0',
        is_active: '1',
        password: '',
        password_confirmation: '',
        acounttype_id: '2',
        professions_id: '1',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === 'password' || name === 'password_confirmation') {
            newValue = sha256(value); 
        }

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

        fetch('https://tulook-api.vercel.app/api/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSubmit),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta a JSON solo si es exitosa
            } else {
                throw new Error('Error al registrarse.');
            }
        })
        .then(data => {
            console.log('Éxito:', data);
            // Llama a la función para cambiar al formulario de inicio de sesión con animación
            onToggleForm();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8 overflow-hidden">
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-4 p-6 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg flex-grow Forms">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Registrarse</h1>
                
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
                
                <GenericButton 
                    type="button" 
                    onClick={handleSubmit} 
                    placeholder="Registrarse" 
                />

                <div onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer" role='button'>
                    Iniciar Sesión
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow hidden md:block">
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
