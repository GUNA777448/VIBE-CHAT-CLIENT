import { Routes, Route , useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CursorSparkle from "./components/CursorSparkle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }


export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<CursorSparkle><Home /></CursorSparkle>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AnimatePresence>
  );
}
