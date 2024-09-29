import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import LoginEm from './Pages/LoginEm';
import Landing from './Pages/Landing';
import { Home } from './Pages/Home';
import { Order } from './Pages/Order.jsx';


export function App() {
    return (
        <div>
            <Routes>
    
                <Route path="/*" element={<Navigate to="/landing" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginem" element={<LoginEm />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Order" element={<Order />} />
                
                
            </Routes>
        </div>
    );
}

export default App;
