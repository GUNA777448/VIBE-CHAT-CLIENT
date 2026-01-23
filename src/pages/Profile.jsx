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

  const handleLogout = () => {
    logoutFromStore();
    navigate("/login");
  };

  const handleGetLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const locationData = await getUserLocation();
      setLocation(locationData.locationName);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#f8f9fa] overflow-auto pb-6">
      <div className="relative z-10 max-w-6xl mx-auto px-3 py-4 sm:p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer border border-gray-200"
          >
            <FiChevronLeft className="text-base md:text-lg text-gray-700" />
          </motion.button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Profile
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4 space-y-4 md:space-y-6"
          >
            {/* Main Profile Card */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
              {/* Cover Image */}
              <div className="relative -mx-4 md:-mx-6 -mt-4 md:-mt-6 mb-6 h-24 md:h-28 bg-gradient-to-r from-[#5b7cfa] to-[#7c8cfa] rounded-t-2xl">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-2 right-2 bg-white/90 text-gray-700 p-1.5 rounded-lg cursor-pointer border-none hover:bg-white transition-all"
                >
                  <FiCamera className="text-xs md:text-sm" />
                </motion.button>
              </div>

              {/* Avatar */}
              <div className="relative -mt-14 md:-mt-16 mb-4">
                <div className="relative w-24 md:w-28 h-24 md:h-28 mx-auto">
                  <img
                    src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 md:w-7 h-6 md:h-7 rounded-lg border-3 border-white"></div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-0 left-0 bg-[#5b7cfa] text-white p-1.5 rounded-lg shadow cursor-pointer border-none"
                  >
                    <FiCamera className="text-xs" />
                  </motion.button>
                </div>
              </div>

              {/* Name & Bio */}
              <div className="text-center mb-4 md:mb-5">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-0.5">
                  {user?.username || user?.name || "Alex Morrison"}
                </h2>
                <p className="text-gray-500 text-xs md:text-sm">
                  {user?.email || "alex@example.com"}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-gray-100">
                <div className="text-center">
                  <div className="text-lg md:text-xl font-semibold text-gray-900">
                    127
                  </div>
                  <div className="text-xs text-gray-500">Chats</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-semibold text-gray-900">
                    892
                  </div>
                  <div className="text-xs text-gray-500">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-semibold text-gray-900">
                    48
                  </div>
                  <div className="text-xs text-gray-500">Groups</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 md:space-y-2">
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
            </div>
          </motion.div>

          {/* Right Column - Settings & Actions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Tabs */}
            <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
                <Tab
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                >
                  <FiUser className="mr-1 md:mr-2 text-sm md:text-base" />
                  <span className="text-xs md:text-sm">Profile</span>
                </Tab>
                <Tab
                  active={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                >
                  <FiSettings className="mr-1 md:mr-2 text-sm md:text-base" />
                  <span className="text-xs md:text-sm">Account</span>
                </Tab>
                <Tab
                  active={activeTab === "privacy"}
                  onClick={() => setActiveTab("privacy")}
                >
                  <FiLock className="mr-1 md:mr-2 text-sm md:text-base" />
                  <span className="text-xs md:text-sm">Privacy</span>
                </Tab>
                <Tab
                  active={activeTab === "notifications"}
                  onClick={() => setActiveTab("notifications")}
                >
                  <FiBell className="mr-1 md:mr-2 text-sm md:text-base" />
                  <span className="text-xs md:text-sm">Notifications</span>
                </Tab>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 md:space-y-5"
                >
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Manage your personal details"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <InputField
                      label="Username"
                      value={user?.username || "alexmorrison"}
                    />
                    <InputField
                      label="Email"
                      value={user?.email || "alex@example.com"}
                    />
                    <InputField label="Phone" value="+1 (555) 123-4567" />
                    <LocationField
                      label="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onGetLocation={handleGetLocation}
                      isLoading={isLoadingLocation}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full sm:w-auto px-4 md:px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all cursor-pointer border-none text-sm"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full sm:w-auto px-4 md:px-5 py-2.5 rounded-xl bg-[#5b7cfa] text-white font-medium hover:bg-[#4b6cfa] transition-all cursor-pointer border-none text-sm"
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
                  className="space-y-4 md:space-y-5"
                >
                  <SectionHeader
                    title="Account Settings"
                    subtitle="Manage your account and security"
                  />

                  <div className="space-y-3 md:space-y-4">
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

                  <div className="pt-4 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleLogout}
                      className="w-full px-5 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all cursor-pointer border-none flex items-center justify-center gap-2 text-sm"
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
                  className="space-y-4 md:space-y-5"
                >
                  <SectionHeader
                    title="Privacy & Security"
                    subtitle="Control your privacy preferences"
                  />

                  <div className="space-y-3 md:space-y-4">
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
                  className="space-y-4 md:space-y-5"
                >
                  <SectionHeader
                    title="Notifications"
                    subtitle="Manage notification preferences"
                  />

                  <div className="space-y-3 md:space-y-4">
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
      className={`flex items-center px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer border-none whitespace-nowrap ${
        active
          ? "bg-[#5b7cfa] text-white"
          : "bg-transparent text-gray-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 p-2 md:p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-8 md:w-9 h-8 md:h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[#5b7cfa] text-sm md:text-base">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-800 font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-xs md:text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

function InputField({ label, value }) {
  return (
    <div>
      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        className="w-full px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#5b7cfa] focus:outline-none focus:ring-1 focus:ring-[#5b7cfa] transition-all"
      />
    </div>
  );
}

function LocationField({ label, value, onChange, onGetLocation, isLoading }) {
  return (
    <div>
      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="flex-1 px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg border border-gray-200 text-sm focus:border-[#5b7cfa] focus:outline-none focus:ring-1 focus:ring-[#5b7cfa] transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGetLocation}
          disabled={isLoading}
          className="px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg bg-[#5b7cfa] text-white hover:bg-[#4b6cfa] transition-all cursor-pointer border-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] justify-center"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FiNavigation className="text-sm" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

function SettingItem({ icon, title, description, toggle, toggleValue }) {
  const [isOn, setIsOn] = useState(toggleValue || false);

  return (
    <div className="flex items-center justify-between p-3 md:p-3.5 rounded-lg hover:bg-gray-50 transition-all group">
      <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
        <div className="w-9 md:w-10 h-9 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#5b7cfa] group-hover:bg-[#5b7cfa]/10 transition-all flex-shrink-0 text-sm md:text-base">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{description}</div>
        </div>
      </div>

      {toggle ? (
        <button
          onClick={() => setIsOn(!isOn)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer flex-shrink-0 ml-2 ${
            isOn ? "bg-[#5b7cfa]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
              isOn ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      ) : (
        <FiEdit2 className="text-gray-400 group-hover:text-[#5b7cfa] transition-colors flex-shrink-0" />
      )}
    </div>
  );
}
