import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout: logoutFromStore } = useAuthStore();

  const handleLogout = () => {
    logoutFromStore();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#E0E7FF] p-0 md:p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5b7cfa]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          w-full h-screen bg-white overflow-hidden
          flex flex-col
          md:rounded-[35px] md:h-[85vh] md:max-w-5xl md:shadow-2xl md:flex-row
          relative z-10
        "
      >
        <ProfileHeader 
            user={user} 
            onBack={() => navigate("/")} 
        />
        
        <ProfileMenu 
            user={user} 
            onLogout={handleLogout} 
        />
        
      </motion.div>
    </div>
  );
}
