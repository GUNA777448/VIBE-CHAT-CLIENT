
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../stores/useAuthStore";
// import ProfileHeader from "../components/Profile/ProfileHeader";
// import ProfileMenu from "../components/Profile/ProfileMenu";
// import { motion } from "framer-motion";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout: logoutFromStore } = useAuthStore();

//   // 🔥 Local editable user state
//   const [localUser, setLocalUser] = useState(user);

//   const handleLogout = () => {
//     logoutFromStore();
//     navigate("/login");
//   };

//   // 🔥 This updates both Header + Menu
//   const handleUpdateUser = (updatedFields) => {
//     setLocalUser((prev) => ({
//       ...prev,
//       ...updatedFields,
//     }));
//   };

//   return (
//     <div className="min-h-screen w-screen flex items-center justify-center bg-[#E0E7FF] p-0 md:p-6 overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="
//           w-full h-screen bg-white overflow-hidden
//           flex flex-col
//           md:rounded-[35px] md:h-[85vh] md:max-w-5xl md:shadow-2xl md:flex-row
//           relative z-10
//         "
//       >
//         <ProfileHeader user={localUser} onBack={() => navigate("/")} />

//         {/* 🔥 Pass update function */}
//         <ProfileMenu
//           user={localUser}
//           onLogout={handleLogout}
//           onUpdateUser={handleUpdateUser}
//         />
//       </motion.div>
//     </div>
//   );
// }


















import { useState, useEffect } from "react";
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

  /* ================= SAVE PROFILE TO DATABASE ================= */

  const handleUpdateUser = async (updatedFields) => {
    try {
      // 🔥 MAP FRONTEND FIELDS → BACKEND FIELDS
      const mappedData = {};

      // About -> bio
      if (updatedFields.about !== undefined) {
        mappedData.bio = updatedFields.about;
      }

      // Phone -> mobile
      if (updatedFields.phoneNumber !== undefined) {
        mappedData.mobile = updatedFields.phoneNumber;
      }

      // Gender
      if (updatedFields.gender !== undefined) {
        mappedData.gender = updatedFields.gender;
      }

      // Birthday
      if (updatedFields.birthday !== undefined) {
        mappedData.birthday = updatedFields.birthday;
      }

      // Avatar (profile pic)
      if (updatedFields.avatar !== undefined) {
        mappedData.avatar = updatedFields.avatar;
      }

      // Username (if you allow editing later)
      if (updatedFields.username !== undefined) {
        mappedData.username = updatedFields.username;
      }

      // 🔥 SEND TO BACKEND
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        mappedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 Backend returns updated user
      setLocalUser(res.data);
      updateUser(res.data); // update Zustand store

      console.log("✅ Profile updated successfully:", res.data);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile ❌");
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  if (!localUser) return null;

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
        {/* 🔥 Header (profile picture upload saves to DB) */}
        <ProfileHeader
          user={localUser}
          onBack={() => navigate("/")}
          onUpdateUser={handleUpdateUser}
        />

        {/* 🔥 Menu (about, phone, gender, birthday saved to DB) */}
        <ProfileMenu
          user={localUser}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      </motion.div>
    </div>
  );
}
