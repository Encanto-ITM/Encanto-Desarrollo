import React from 'react';
import SignInputs from './SignInputs'; // Suponiendo que tienes este componente
import GenericButton from './GenericButton'; // Y este también

export default function UpdatePasswordForm({
    formData,
    errors,
    submitted,
    successMessage,
    handleChange,
    handleSubmit,
}) {
    return (
        <div className="w-3/4 flex flex-col gap-6">
            <SignInputs
                placeholder="Nueva Contraseña"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
            />
            {submitted && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <SignInputs
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={formData.confirmPassword}
            />
            {submitted && errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <GenericButton
                type="button"
                onClick={handleSubmit}
                placeholder="Restablecer Contraseña"
                className="mt-2 h-12"
            />
        </div>
    );
}