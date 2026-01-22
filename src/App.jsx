import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./stores/protectedRoute";

export default function App() {
  const location = useLocation();

  return (

    
    <>
      {/* Toast container (GLOBAL – only once) */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
