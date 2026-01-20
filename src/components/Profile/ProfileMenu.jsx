import React from "react";
import { FiUser, FiMail, FiPhone, FiLogOut, FiChevronRight } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";

export default function ProfileMenu({ user, onLogout }) {
  return (
    <div
      className="
        w-full h-[60vh] p-6 space-y-4 overflow-y-auto
        bg-gray-50
        min-[800px]:h-full
        min-[800px]:w-[55%]
        min-[800px]:p-10
        min-[800px]:flex min-[800px]:flex-col min-[800px]:justify-center
      "
    >
        <div className="space-y-4 max-w-md mx-auto w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 hidden min-[800px]:block">Account Settings</h3>

            <MenuItem icon={<FiUser />} label="About" value="Available" />
            <MenuItem icon={<FiMail />} label="Email" value={user?.email || "user@example.com"} />
            <MenuItem icon={<FaBirthdayCake />} label="Birthday" value="Jan 1, 2000" />
            <MenuItem icon={<MdWc />} label="Gender" value="Male" />
            
            <div className="h-4"></div> {/* Spacer */}
            
            <MenuItem icon={<FiPhone />} label="Support" isLink />
            
            <button
                className="w-full mt-8 bg-red-50 text-red-500 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 hover:shadow-sm transition-all duration-300 group cursor-pointer border-none"
                onClick={onLogout}
            >
                <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
                Sign Out
            </button>
        </div>
    </div>
  );
}

function MenuItem({ icon, label, value, isLink }) {
  return (
    <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className="flex flex-col items-start">
           <span className="text-sm font-medium text-gray-900">{label}</span>
           {value && <span className="text-xs text-gray-500 mt-0.5">{value}</span>}
        </div>
      </div>
      
      {isLink ? (
          <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
      ) : (
          <div className="hidden group-hover:flex items-center text-xs font-semibold text-[#5b7cfa]">
              Edit
          </div>
      )}
    </div>
  );
}
