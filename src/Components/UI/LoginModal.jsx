import React from 'react';

const LoginModal = ({ onLoginClick, onCancelClick }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-80">
                <h3 className="text-lg font-bold text-center mb-4">No estás logueado</h3>
                <p className="text-center mb-4">Para completar la acción, por favor inicia sesión.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-purple text-white px-4 py-2 rounded-md" onClick={onLoginClick}>Ir al Login</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onCancelClick}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
