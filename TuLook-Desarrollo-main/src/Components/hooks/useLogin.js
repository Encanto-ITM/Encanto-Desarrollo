import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useLogin() {
    const [showSignIn, setShowSignIn] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const form = queryParams.get('form');

        if (form === 'signup') {
            setShowSignIn(false);
        } else {
            setShowSignIn(true);
        }
        
        setInitialLoad(false);
    }, [location.search]);

    const toggleForm = () => {
        setShowSignIn(prev => !prev);
    };

    return { showSignIn, toggleForm, initialLoad };
}
