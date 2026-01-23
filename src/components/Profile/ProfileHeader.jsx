import React from "react";
import { FiChevronLeft, FiCamera, FiCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfileHeader({ user, onBack }) {
  const navigate = useNavigate();

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
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="text-white flex items-center gap-2 text-lg font-medium bg-transparent border-none cursor-pointer hover:opacity-90 transition"
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
            <FiChevronLeft className="text-xl" />
          </div>
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 cursor-pointer border border-white/20 hover:bg-white/30 transition-all shadow-lg"
        >
          Edit Profile
        </motion.button>
      </div>

      {/* Avatar Section */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/50 transition-all duration-500"></div>

          <div className="relative">
            <img
              src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
              className="
                    relative
                    w-32 h-32 rounded-[35px] object-cover
                    border-[5px] border-white/40
                    shadow-2xl
                    min-[800px]:w-[clamp(180px,20vw,260px)]
                    min-[800px]:h-[clamp(180px,20vw,260px)]
                    transform group-hover:scale-[1.03] transition-transform duration-500
                "
              alt="Profile"
            />

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
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-white/90 font-medium tracking-wide bg-white/15 px-5 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20"
        >
          {user?.email || "user@example.com"}
        </motion.p>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex gap-6 items-center"
        >
          <div className="text-center">
            <p className="text-2xl font-bold">127</p>
            <p className="text-xs text-white/70 mt-1">Chats</p>
          </div>
          <div className="w-px h-10 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">48</p>
            <p className="text-xs text-white/70 mt-1">Groups</p>
          </div>
          <div className="w-px h-10 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">892</p>
            <p className="text-xs text-white/70 mt-1">Messages</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
