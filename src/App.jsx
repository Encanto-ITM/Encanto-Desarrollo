import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import LoginEm from './Pages/LoginEm';
import ResetPassword from './Pages/ResetPassword';
import Landing from './Pages/Landing';
import { Confirmation } from './Pages/Confirmation';
import { Results } from './Pages/Results';
import { Home } from './Pages/Home';
import { WorkerProfile } from './Pages/WorkerProfile';
import { Order } from './Pages/Order';
import { List } from './Pages/List';
import AboutUs from './Pages/AboutUs';
import { CartProvider } from './Components/Cart/CartContext';
import CartList from './Pages/CartList';
import { Service } from './Pages/Service';
import { ContactUs } from './Pages/ContactUs';
import ProtectedRoute from './Components/Activity/ProtectedRoute'; 

export function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            <CartProvider>
                <Routes>
                  
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cartlist" element={<CartList />} />
                    <Route path="/loginem" element={<LoginEm />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/results/:id" element={<Results />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contactus" element={<ContactUs />} />
                   
                    <Route 
                        path="/home" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Home />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/workerprofile/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <WorkerProfile />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/order/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Order />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/confirmation/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Confirmation />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/service/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Service />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/list/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <List />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </CartProvider>
        </div>
    );
}

export default App;
