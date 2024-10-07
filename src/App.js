import React from "react";
import './demo.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Data from "./components/Data";
import { AuthProvider } from './AuthContext';


function App() {

  const Secure = ({ component: Component }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
    return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
  };

  const InSecure = ({ component: Component }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
    return !isAuthenticated ? <Component /> : <Navigate to="/data" replace />;
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/"element={<InSecure component={SignUp} />} />
          <Route path="/login" element={<InSecure component={SignIn} />} />

          <Route
            path="/data"
            element={<Secure component={Data} />}

          />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
