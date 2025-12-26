import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import CursorSparkle from "./components/CursorSparkle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import useAuthStore from "./stores/useAuthStore"; // Your auth store

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const location = useLocation();
  const { token, setLoading, logout } = useAuthStore();

  useEffect(() => {
    // Validate token on route change
    const validateAuth = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch('http://localhost:5000/api/auth/signin', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            logout();
          }
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
      }
    };
    
    validateAuth();
  }, [location.pathname, token, setLoading, logout]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <CursorSparkle>
            <Home />
          </CursorSparkle>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        
        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
