import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import LoginEm from './Pages/LoginEm';
import ResetPassword from './Pages/ResetPassword.jsx';
import Landing from './Pages/Landing';
import { Confirmation } from './Pages/Confirmation';
import { Results } from './Pages/Results';
import { Home } from './Pages/Home';
import { WorkerProfile } from './Pages/WorkerProfile';
import { Order } from './Pages/Order';
import AboutUs from './Pages/AboutUs';

export function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/landing"} />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/loginem" element={<LoginEm />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/results" element={<Results />}/>
                <Route path="/results/:id" element={<Results />}/>
                
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/workerprofile/:id" element={<PrivateRoute element={<WorkerProfile />} />} />
                <Route path="/order/:id" element={<PrivateRoute element={<Order />} />} />
                <Route path="/confirmation/:id" element={<PrivateRoute element={<Confirmation />} />} />
               
                
                <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </div>
    );
}

export default App;

