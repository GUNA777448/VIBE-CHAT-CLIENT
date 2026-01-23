import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLogOut,
  FiChevronRight,
  FiSettings,
  FiBell,
  FiLock,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { motion } from "framer-motion";

export default function ProfileMenu({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div
      className="
        w-full h-[60vh] p-6 space-y-4 overflow-y-auto
        bg-gradient-to-br from-gray-50 to-gray-100/50
        min-[800px]:h-full
        min-[800px]:w-[55%]
        min-[800px]:p-10
        min-[800px]:flex min-[800px]:flex-col min-[800px]:justify-center
      "
    >
      <div className="space-y-6 max-w-md mx-auto w-full">
        {/* Header with Tabs */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 hidden min-[800px]:block">
            Profile Settings
          </h3>

          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm">
            <TabButton
              active={activeTab === "account"}
              onClick={() => setActiveTab("account")}
            >
              Account
            </TabButton>
            <TabButton
              active={activeTab === "privacy"}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy
            </TabButton>
            <TabButton
              active={activeTab === "help"}
              onClick={() => setActiveTab("help")}
            >
              Help
            </TabButton>
          </div>
        </div>

        {/* Account Tab */}
        {activeTab === "account" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <SectionTitle>Personal Information</SectionTitle>
            <MenuItem
              icon={<FiUser />}
              label="Username"
              value={user?.username || user?.name || "User"}
            />
            <MenuItem
              icon={<FiMail />}
              label="Email"
              value={user?.email || "user@example.com"}
            />
            <MenuItem
              icon={<FiPhone />}
              label="Phone"
              value={user?.phoneNumber || "+1 234 567 8900"}
            />
            <MenuItem
              icon={<FaBirthdayCake />}
              label="Birthday"
              value="Jan 1, 2000"
            />
            <MenuItem icon={<MdWc />} label="Gender" value="Male" />

            <SectionTitle className="mt-6">Account Settings</SectionTitle>
            <MenuItem
              icon={<FiSettings />}
              label="Preferences"
              value="Customize your experience"
              isLink
            />
            <MenuItem
              icon={<FiMessageSquare />}
              label="Chat Settings"
              value="Manage chat options"
              isLink
            />
          </motion.div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <SectionTitle>Privacy & Security</SectionTitle>
            <MenuItem
              icon={<FiLock />}
              label="Privacy Settings"
              value="Control who can see your info"
              isLink
            />
            <MenuItem
              icon={<FiBell />}
              label="Notifications"
              value="Manage your notifications"
              isLink
            />
            <MenuItem
              icon={<FiSettings />}
              label="Blocked Users"
              value="View blocked contacts"
              isLink
            />
            <MenuItem
              icon={<FiLock />}
              label="Two-Factor Auth"
              value="Enhanced security"
              isLink
            />
          </motion.div>
        )}

        {/* Help Tab */}
        {activeTab === "help" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <SectionTitle>Support & Info</SectionTitle>
            <MenuItem
              icon={<FiHelpCircle />}
              label="Help Center"
              value="Get help and support"
              isLink
            />
            <MenuItem
              icon={<FiPhone />}
              label="Contact Support"
              value="Reach our team"
              isLink
            />
            <MenuItem
              icon={<FiMessageSquare />}
              label="FAQs"
              value="Frequently asked questions"
              isLink
            />
            <MenuItem
              icon={<FiSettings />}
              label="App Info"
              value="Version 2.1.0"
            />
          </motion.div>
        )}

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 group cursor-pointer border-none shadow-md"
          onClick={onLogout}
        >
          <FiLogOut className="group-hover:-translate-x-1 transition-transform text-lg" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-none
        ${
          active
            ? "bg-gradient-to-r from-[#5b7cfa] to-[#4b6cff] text-white shadow-md"
            : "bg-transparent text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      {children}
    </button>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h4
      className={`text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 ${className}`}
    >
      {children}
    </h4>
  );
}

function MenuItem({ icon, label, value, isLink }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 2 }}
      className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#5b7cfa]/30"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:from-[#5b7cfa] group-hover:to-[#4b6cff] group-hover:text-white transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-900">{label}</span>
          {value && <span className="text-xs text-gray-500 mt-1">{value}</span>}
        </div>
      </div>

      {isLink ? (
        <FiChevronRight className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#5b7cfa] transition-all" />
      ) : (
        <div className="opacity-0 group-hover:opacity-100 flex items-center text-xs font-bold text-[#5b7cfa] transition-opacity">
          Edit
        </div>
      )}
    </motion.div>
  );
}
