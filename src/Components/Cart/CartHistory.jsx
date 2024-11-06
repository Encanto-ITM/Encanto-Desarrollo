import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../UI/LoginModal';  

export function CartHistory() {
    const { cart, history, removeFromCart } = useCart();
    const navigate = useNavigate();
    
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [showModal, setShowModal] = useState(false); 

    const addedItems = history.filter(action =>
        action.type === 'ADD' && cart.some(item => item.id === action.item.id)
    );

    const handleConfirmOrder = (item) => {
        if (!isAuthenticated) {
            setShowModal(true); 
            return;
        }

        const selectedTime = item.selectedTime || null;
        navigate(`/confirmation/${item.id}`, { state: { service: item, selectedTime } });
    };

    const closeModal = () => setShowModal(false); 

    return (
        <div className="min-h-screen bg-gray-100 overflow-y-auto h-[48rem] hidenscroll mb-16">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold my-8 text-center py-4 border-b">Historial del Carrito:</h2>
                {addedItems.length === 0 ? (
                    <p className="text-center">No hay historial de acciones en el carrito.</p>
                ) : (
                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-6xl p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {addedItems.map((action, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 border">
                                        <img
                                            src={action.item.imageUrl || '/img/placeholder.jpg'}
                                            alt={`Imagen de ${action.item.name}`}
                                            className="w-full h-48 object-cover rounded-t-md"
                                        />
                                        <h2 className="text-xl font-semibold mt-2">{action.item.name}</h2>
                                        <h2 className="text-xl font-semibold mt-2">₡{action.item.price}</h2>
                                        <p className="text-xs mt-2">
                                            {action.timestamp.toLocaleString()} - Agregado
                                        </p>
                                        {action.item.selectedTime && (
                                            <p className="text-xs mt-2">
                                                Hora seleccionada: {new Date(action.item.selectedTime).toLocaleString()}
                                            </p>
                                        )}
                                        <div className="flex gap-4 mt-4">
                                            <button
                                                className="text-purple border-2 border-purple px-4 py-2 rounded hover:scale-105 duration-500"
                                                onClick={() => handleConfirmOrder(action.item)}
                                                aria-label="Confirmar Orden"
                                            >
                                                Ordenar
                                            </button>
                                            <button
                                                className="text-red border-2 border-red px-4 py-2 rounded hover:scale-105 duration-500"
                                                onClick={() => removeFromCart(action.item.id)}
                                                aria-label="Eliminar del Carrito"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <LoginModal 
                    onLoginClick={() => setIsAuthenticated(true)} 
                    onCancelClick={closeModal}
                />
            )}
        </div>
    );
}
