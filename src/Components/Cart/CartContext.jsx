import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cart: [],
    history: [],
};

//esto va en un hook, codigo basura en un componente
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => 
                item.id === action.payload.id && item.selectedTime === action.payload.selectedTime
            );
            if (existingItem) {
                return state; 
            }
            return {
                ...state,
                cart: [...state.cart, action.payload],
                history: [...state.history, { timestamp: new Date(), type: 'ADD', item: action.payload }],
            };
        case 'REMOVE_FROM_CART':
            const removedItem = state.cart.find(item => item.id === action.payload);
            const updatedHistory = state.history.filter(action => 
                !(action.type === 'ADD' && action.item.id === removedItem.id)
            ); 

            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
                history: [...updatedHistory, { timestamp: new Date(), type: 'REMOVE', item: removedItem }],
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
                history: [...state.history, { timestamp: new Date(), type: 'CLEAR' }],
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ cart: state.cart, history: state.history, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
