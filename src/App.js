import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Profile from "./components/pages/Profile.jsx";
import Register from "./components/pages/Register.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/profile/:username" element={<Profile />} />
                <Route 
                    path="/login" 
                    element={user ? <Navigate to="/" /> : <Login />} 
                />
                <Route 
                    path="/register" 
                    element={user ? <Navigate to="/" /> : <Register />} 
                />
                <Route 
                    path="/" 
                    element={user ? <Home /> : <Register />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
