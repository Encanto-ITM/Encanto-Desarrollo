import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import { Home } from './Pages/Home';
import { WorkerProfile } from './Pages/WorkerProfile.jsx';
import { Order } from './Pages/Order.jsx';



export function App() {
    return (
        <div>
            <Routes>
    
                <Route path="/*" element={<Navigate to="/landing" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/workerprofile" element={<WorkerProfile />} />
                <Route path="/Order" element={<Order />} />
                
                
            </Routes>
        </div>
    );
}

export default App;
