import React from "react";
import { FaGoogle, FaFacebookF, FaTwitter, FaApple } from "react-icons/fa";

export default function SocialLogin({ onGoogleClick, onFacebookClick }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center w-full my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="flex-shrink-0 px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">
          Or continue with
        </span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <div className="flex gap-4 justify-center">
        <SocialButton icon={<FaGoogle />} onClick={onGoogleClick} color="text-red-500" label="Google" />
        <SocialButton icon={<FaFacebookF />} onClick={onFacebookClick} color="text-blue-600" label="Facebook" />
        {/* Optional: Add more if needed */}
      </div>
    </div>
  );
}

function SocialButton({ icon, onClick, color, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-12 h-12
        rounded-full
        bg-gray-50 border border-gray-100
        flex items-center justify-center
        text-xl ${color}
        shadow-sm
        hover:bg-white hover:shadow-md hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      `}
      aria-label={`Sign in with ${label}`}
    >
      {icon}
    </button>
  );
}
