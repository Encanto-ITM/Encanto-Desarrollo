import React, { useState } from 'react';
import GenericButton from './GenericButton'; 
import SignInputsEm from './SignInputsEm'; 
import { sha256 } from 'js-sha256'; 

export function ResetPasswordForm() {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let errors = '';
        if (!formData.email) errors += "El correo electrónico es requerido. ";
        if (!formData.newPassword) errors += "La nueva contraseña es requerida. ";
        if (formData.newPassword !== formData.confirmPassword) errors += "Las contraseñas no coinciden.";
        return errors;
    };

    const resetForm = () => {
        setFormData({
            email: '',
            newPassword: '',
            confirmPassword: '',
        });
        setError('');
        setSubmitted(false); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setError('');
        setSuccessMessage('');

        const formErrors = validateForm();
        if (formErrors) {
            setError(formErrors);
            return;
        }

        try {
            const formDataToSubmit = {
                email: formData.email,
                password: sha256(formData.newPassword),
                password_confirmation: sha256(formData.confirmPassword),
            };

            const response = await fetch('http://127.0.0.1:8000/api/users/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSubmit),
            });

            const responseText = await response.text();
            if (!response.ok) {
                throw new Error(responseText || 'Error al restablecer la contraseña');
            }

            const data = JSON.parse(responseText);
            setSuccessMessage('Contraseña restablecida con éxito. Puedes iniciar sesión ahora.');
            resetForm(); // Limpiar el formulario aquí
        } catch (error) {
            console.error('Error en la solicitud de restablecimiento de contraseña:', error);
            setError('Hubo un error al restablecer la contraseña. Inténtalo más tarde.');
        }
    };

    return (
        <section className="flex flex-col md:flex-row w-full max-w-3xl mx-auto p-0 overflow-hidden">
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-4 p-6 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg flex-grow Forms">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Restablecer Contraseña</h1>
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <SignInputsEm
                    placeholder="Correo electrónico"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email} // Asegúrate de vincular el valor
                />
                <SignInputsEm
                    placeholder="Nueva Contraseña"
                    name="newPassword"
                    type="password"
                    onChange={handleChange}
                    value={formData.newPassword} // Asegúrate de vincular el valor
                />
                <SignInputsEm
                    placeholder="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    value={formData.confirmPassword} // Asegúrate de vincular el valor
                />
                <GenericButton
                    type="button"
                    onClick={handleSubmit}
                    placeholder="Restablecer Contraseña"
                />

                <a href="/login?form=signin" className="text-purple hover:underline text-center">
                    Login Usuario
                </a>
            </div>
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Reset-Password.png"
                    className="w-full h-full object-cover rounded-tr-[40px] rounded-br-[40px]"
                    alt="Register Mujer"
                    loading="lazy"
                />
            </div>
        </section>
    );
}