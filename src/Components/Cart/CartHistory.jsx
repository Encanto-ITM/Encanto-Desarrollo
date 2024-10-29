// CartHistory.js
import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

export function CartHistory() {
    const { cart, history, removeFromCart } = useCart();
    const navigate = useNavigate();

    // Filtrar los elementos que se han agregado al carrito
    const addedItems = history.filter(action => 
        action.type === 'ADD' && cart.some(item => item.id === action.item.id)
    );

    const handleConfirmOrder = (item) => {
        // Asegúrate de que el tiempo seleccionado está disponible en el item
        const selectedTime = item.selectedTime || null; // Si tienes un campo para tiempo seleccionado

        navigate(`/confirmation/${item.id}`, { state: { service: item, selectedTime } });
    };

    return (
        <div className="overflow-y-auto h-[48rem] hidenscroll mb-16">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold my-8 text-center">Historial del Carrito:</h2>
                {addedItems.length === 0 ? (
                    <p className="text-center">No hay historial de acciones en el carrito.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {addedItems.map((action, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-md p-4 flex flex-col">
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
                                <button 
                                    className="mt-4 bg-purple text-white rounded-md p-2"
                                    onClick={() => handleConfirmOrder(action.item)}
                                >
                                    Confirmar Orden
                                </button>
                                <button 
                                    className="mt-4 bg-red-500 text-white rounded-md p-2"
                                    onClick={() => removeFromCart(action.item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
