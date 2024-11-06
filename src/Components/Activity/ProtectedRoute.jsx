import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/landing" replace />;
    }
    return children;
};

export default ProtectedRoute;
