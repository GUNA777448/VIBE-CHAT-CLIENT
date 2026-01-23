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

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout: logoutFromStore } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logoutFromStore();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#E0E7FF] via-[#F0F4FF] to-[#E8ECFF] overflow-auto">
      {/* Background Decorations */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#5b7cfa]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        {/* Header with Back Button */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-none flex items-center gap-2 text-gray-700 font-semibold"
          >
            <FiChevronLeft className="text-xl" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>

          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <div className="w-20"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Main Profile Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              {/* Cover Image */}
              <div className="relative -mx-8 -mt-8 mb-6 h-32 bg-gradient-to-r from-[#5b7cfa] to-[#4b6cff] rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl cursor-pointer border-none hover:bg-white/30 transition-all"
                >
                  <FiCamera className="text-sm" />
                </motion.button>
              </div>

              {/* Avatar */}
              <div className="relative -mt-20 mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center">
                    <FiCheck className="text-white text-xs" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-0 left-0 bg-[#5b7cfa] text-white p-2 rounded-xl shadow-lg cursor-pointer border-none"
                  >
                    <FiCamera className="text-sm" />
                  </motion.button>
                </div>
              </div>

              {/* Name & Bio */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {user?.username || user?.name || "Alex Morrison"}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {user?.email || "alex@example.com"}
                </p>
                <p className="text-gray-600 text-sm px-4">
                  Living my best life 🌟 | Tech enthusiast | Coffee lover ☕
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5b7cfa]">127</div>
                  <div className="text-xs text-gray-500">Chats</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5b7cfa]">892</div>
                  <div className="text-xs text-gray-500">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5b7cfa]">48</div>
                  <div className="text-xs text-gray-500">Groups</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <InfoRow
                  icon={<FiPhone />}
                  label="Phone"
                  value="+1 (555) 123-4567"
                />
                <InfoRow
                  icon={<FiMapPin />}
                  label="Location"
                  value="San Francisco, CA"
                />
                <InfoRow
                  icon={<FaBirthdayCake />}
                  label="Birthday"
                  value="January 15, 1995"
                />
                <InfoRow icon={<MdWc />} label="Gender" value="Male" />
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-3">
                  Connect with me
                </p>
                <div className="flex justify-center gap-3">
                  <SocialIcon icon={<FaFacebookF />} />
                  <SocialIcon icon={<FaTwitter />} />
                  <SocialIcon icon={<FaLinkedinIn />} />
                  <SocialIcon icon={<FaInstagram />} />
                  <SocialIcon icon={<FaGithub />} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Settings & Actions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Tabs */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-2 shadow-xl border border-white/50">
              <div className="flex gap-2 overflow-x-auto">
                <Tab
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                >
                  <FiUser className="mr-2" />
                  Profile
                </Tab>
                <Tab
                  active={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                >
                  <FiSettings className="mr-2" />
                  Account
                </Tab>
                <Tab
                  active={activeTab === "privacy"}
                  onClick={() => setActiveTab("privacy")}
                >
                  <FiLock className="mr-2" />
                  Privacy
                </Tab>
                <Tab
                  active={activeTab === "notifications"}
                  onClick={() => setActiveTab("notifications")}
                >
                  <FiBell className="mr-2" />
                  Notifications
                </Tab>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Update your personal details"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Username"
                      value={user?.username || "alexmorrison"}
                    />
                    <InputField
                      label="Email"
                      value={user?.email || "alex@example.com"}
                    />
                    <InputField label="Phone" value="+1 (555) 123-4567" />
                    <InputField label="Location" value="San Francisco, CA" />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <TextAreaField
                      label="Bio"
                      value="Living my best life 🌟 | Tech enthusiast | Coffee lover ☕"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all cursor-pointer border-none"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#5b7cfa] to-[#4b6cff] text-white font-semibold hover:shadow-lg transition-all cursor-pointer border-none"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === "account" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <SectionHeader
                    title="Account Settings"
                    subtitle="Manage your account preferences"
                  />

                  <div className="space-y-4">
                    <SettingItem
                      icon={<FiEdit2 />}
                      title="Change Password"
                      description="Update your password regularly for security"
                    />
                    <SettingItem
                      icon={<FiShield />}
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security"
                      toggle
                    />
                    <SettingItem
                      icon={<FiMessageSquare />}
                      title="Chat Settings"
                      description="Customize your chat experience"
                    />
                    <SettingItem
                      icon={<FiImage />}
                      title="Media & Storage"
                      description="Manage your media files and storage"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                    >
                      <FiLogOut />
                      Sign Out
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <SectionHeader
                    title="Privacy & Security"
                    subtitle="Control your privacy settings"
                  />

                  <div className="space-y-4">
                    <SettingItem
                      icon={<FiLock />}
                      title="Profile Visibility"
                      description="Everyone can see your profile"
                      toggle
                      toggleValue={true}
                    />
                    <SettingItem
                      icon={<FiUser />}
                      title="Last Seen"
                      description="Show when you were last active"
                      toggle
                      toggleValue={true}
                    />
                    <SettingItem
                      icon={<FiMessageSquare />}
                      title="Read Receipts"
                      description="Let others know when you've read their messages"
                      toggle
                      toggleValue={false}
                    />
                    <SettingItem
                      icon={<FiShield />}
                      title="Blocked Users"
                      description="Manage blocked contacts"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <SectionHeader
                    title="Notification Preferences"
                    subtitle="Manage how you receive notifications"
                  />

                  <div className="space-y-4">
                    <SettingItem
                      icon={<FiBell />}
                      title="Push Notifications"
                      description="Receive push notifications on your device"
                      toggle
                      toggleValue={true}
                    />
                    <SettingItem
                      icon={<FiMail />}
                      title="Email Notifications"
                      description="Receive updates via email"
                      toggle
                      toggleValue={true}
                    />
                    <SettingItem
                      icon={<FiMessageSquare />}
                      title="Message Alerts"
                      description="Get notified for new messages"
                      toggle
                      toggleValue={true}
                    />
                    <SettingItem
                      icon={<FiHelpCircle />}
                      title="Help & Support"
                      description="Get help and contact support"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Component Definitions
function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer border-none whitespace-nowrap ${
        active
          ? "bg-gradient-to-r from-[#5b7cfa] to-[#4b6cff] text-white shadow-lg"
          : "bg-transparent text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-[#5b7cfa]/10 flex items-center justify-center text-[#5b7cfa]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-700 font-medium">{value}</div>
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#5b7cfa] hover:text-white transition-all cursor-pointer border-none"
    >
      {icon}
    </motion.button>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function InputField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b7cfa] focus:outline-none focus:ring-2 focus:ring-[#5b7cfa]/20 transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        rows={3}
        defaultValue={value}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5b7cfa] focus:outline-none focus:ring-2 focus:ring-[#5b7cfa]/20 transition-all resize-none"
      />
    </div>
  );
}

function SettingItem({ icon, title, description, toggle, toggleValue }) {
  const [isOn, setIsOn] = useState(toggleValue || false);

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all group">
      <div className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5b7cfa]/10 to-[#4b6cff]/10 flex items-center justify-center text-[#5b7cfa] group-hover:from-[#5b7cfa]/20 group-hover:to-[#4b6cff]/20 transition-all">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{title}</div>
          <div className="text-xs text-gray-500 mt-1">{description}</div>
        </div>
      </div>

      {toggle ? (
        <button
          onClick={() => setIsOn(!isOn)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer ${
            isOn ? "bg-[#5b7cfa]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isOn ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ) : (
        <FiEdit2 className="text-gray-400 group-hover:text-[#5b7cfa] transition-colors" />
      )}
    </div>
  );
}
