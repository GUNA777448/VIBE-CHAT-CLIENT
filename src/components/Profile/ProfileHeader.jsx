  import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileHeader({ user, onBack }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-gradient-to-br from-[#5b7cfa] to-[#4b6cff] text-white
        h-[40vh] w-full 
        rounded-b-[40px]
        relative
        px-6 pt-6 pb-10
        flex flex-col
        min-[800px]:h-full
        min-[800px]:w-[45%]
        min-[800px]:rounded-b-none
        min-[800px]:rounded-l-[30px]
        shadow-lg z-10
      "
    >
      
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="text-white flex items-center gap-2 text-lg font-medium bg-transparent border-none cursor-pointer hover:opacity-80 transition"
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <FiChevronLeft className="text-xl" />
          </div>
          <span className="hidden sm:inline">Back</span>
        </button>

        <button className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/10 hover:bg-white/30 transition shadow-sm">
          Edit Profile
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/40 transition-all duration-500"></div>
            
            <img
            src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
            className="
                relative
                w-32 h-32 rounded-[35px] object-cover
                border-[4px] border-white/30
                shadow-2xl
                min-[800px]:w-[clamp(180px,20vw,260px)]
                min-[800px]:h-[clamp(180px,20vw,260px)]
                transform group-hover:scale-[1.02] transition-transform duration-500
            "
            alt="Profile Code"
            />
        </div>

        <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight">
          {user?.username || user?.name || "User"}
        </h2>
        <p className="mt-2 text-white/80 font-light tracking-wide bg-black/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {user?.phoneNumber || "No phone number added"}
        </p>
      </div>
    </div>
  );
}
