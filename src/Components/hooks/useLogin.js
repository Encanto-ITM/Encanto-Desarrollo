import { useState } from 'react';

export function useLogin() {
    const [showSignIn, setShowSignIn] = useState(true);

    const toggleForm = () => {
        setShowSignIn((prevShowSignIn) => !prevShowSignIn);
    };

    return { showSignIn, toggleForm };
}
