import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Landing from './Pages/Landing';


export function App() {
    return (
        <div>
            <Routes>
    
                <Route path="/*" element={<Navigate to="/landing" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<Landing />} />
                
                
            </Routes>
        </div>
    );
}

export default App;
