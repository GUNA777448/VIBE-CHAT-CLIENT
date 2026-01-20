import React from "react";
import { CgSpinner } from "react-icons/cg";

export default function AuthButton({ children, onClick, type = "button", loading = false, disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        relative
        w-full
        py-3.5
        rounded-full
        bg-gradient-to-r from-[#3f63c5] to-[#4b6cff]
        text-white
        font-semibold
        text-sm md:text-base
        shadow-lg shadow-[#3f63c5]/30
        hover:shadow-xl hover:shadow-[#3f63c5]/40 hover:-translate-y-0.5
        active:scale-[0.98] active:shadow-none
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        transition-all duration-300
        flex justify-center items-center
        overflow-hidden
        ${className}
      `}
    >
       {loading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <CgSpinner className="animate-spin text-xl" />
        </span>
      )}
      <span className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}>
        {children}
      </span>
    </button>
  );
}
