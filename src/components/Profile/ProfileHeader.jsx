import React, { useRef, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ user, onBack }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(
    user?.avatar ||
      "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
  );

  // Open file picker when clicking Edit Profile
  const handleEditProfile = () => {
    fileInputRef.current.click();
  };

  // When user selects a new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Later we will upload this file to backend here
      console.log("Selected new avatar:", file);
    }
  };

  return (
    <div
      className="
        bg-gradient-to-br from-[#5b7cfa] via-[#4b6cff] to-[#3a5ce8] text-white
        h-[40vh] w-full 
        rounded-b-[40px]
        relative overflow-hidden
        px-6 pt-6 pb-10
        flex flex-col
        min-[800px]:h-full
        min-[800px]:w-[45%]
        min-[800px]:rounded-b-none
        min-[800px]:rounded-l-[30px]
        shadow-2xl z-10
      "
    >
      {/* Header buttons */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 text-lg font-medium bg-transparent border-none cursor-pointer hover:opacity-90 transition"
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
            <FiChevronLeft className="text-xl" />
          </div>
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        <button
          onClick={handleEditProfile}
          className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/10 hover:bg-white/30 transition shadow-sm"
        >
          Edit Profile
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleImageChange}
        />
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/40 transition-all duration-500"></div>

          <img
            src={previewImage}
            className="
              relative
              w-32 h-32 rounded-[35px] object-cover
              border-[4px] border-white/30
              shadow-2xl
              min-[800px]:w-[clamp(180px,20vw,260px)]
              min-[800px]:h-[clamp(180px,20vw,260px)]
              transform group-hover:scale-[1.02] transition-transform duration-500
            "
            alt="Profile Avatar"
          />
        </div>

            {/* Camera Button Overlay */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-2 right-2 bg-white text-[#5b7cfa] p-3 rounded-2xl shadow-lg cursor-pointer border-none hover:shadow-xl transition-all"
            >
              <FiCamera className="text-lg" />
            </motion.button>
          </div>

          {/* Verified Badge */}
          <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-4 border-[#5b7cfa]">
            <FiCheck className="text-sm" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-2xl md:text-3xl font-bold tracking-tight"
        >
          {user?.username || user?.name || "User"}
        </h2>

        <p className="mt-2 text-white/80 font-light tracking-wide bg-black/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {user?.phoneNumber || "No phone number added"}
        </p>
      </div>
    </div>
  );
}







