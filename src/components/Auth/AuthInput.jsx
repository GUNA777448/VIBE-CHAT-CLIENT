import React from "react";

export default function AuthInput({ label, type = "text", name, value, onChange, placeholder, required = false, className = "" }) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          px-4 py-3
          rounded-[12px]
          border border-gray-200
          bg-gray-50
          text-gray-800
          text-sm md:text-base
          placeholder-gray-400
          font-medium
          transition-all duration-300
          focus:outline-none focus:bg-white focus:border-[#4b6cff] focus:ring-4 focus:ring-[#4b6cff]/10
          hover:border-gray-300
        "
      />
    </div>
  );
}
