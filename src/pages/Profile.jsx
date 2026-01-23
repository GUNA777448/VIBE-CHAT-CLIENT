
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronLeft,
  FiEdit2,
  FiCamera,
  FiSettings,
  FiBell,
  FiLock,
  FiHelpCircle,
  FiLogOut,
  FiUser,
  FiCheck,
  FiMessageSquare,
  FiImage,
  FiShield,
  FiNavigation,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { getUserLocation } from "../utils/location";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout: logoutFromStore } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [location, setLocation] = useState("San Francisco, CA");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // 🔥 Local editable user state
  const [localUser, setLocalUser] = useState(user);

  const handleLogout = () => {
    logoutFromStore();
    navigate("/login");
  };

  // 🔥 This updates both Header + Menu
  const handleUpdateUser = (updatedFields) => {
    setLocalUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#E0E7FF] p-0 md:p-6 overflow-hidden">
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
        <ProfileHeader user={localUser} onBack={() => navigate("/")} />

        {/* 🔥 Pass update function */}
        <ProfileMenu
          user={localUser}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      </motion.div>
    </div>
  );
}




















