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

                    
                    <Route path="/home" element={<Home />} />
                    <Route path="/workerprofile/:id" element={<WorkerProfile />} />
                    <Route path="/order/:id" element={<Order />} />
                    <Route path="/confirmation/:id" element={<Confirmation />} />
                    <Route path="/service/:id" element={<Service />} />
                    <Route path="/list/:id" element={<List />} />
                </Routes>
            </CartProvider>
        </div>
    );
}

export default App;
