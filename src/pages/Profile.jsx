import {
  FiChevronLeft,
  FiEdit,
  FiMail,
  FiPhone,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout: logoutFromStore } = useAuthStore();

  const handleLogout = () => {
    // Use Zustand logout action which clears all state
    logoutFromStore();
    // Redirect to login page
    navigate("/login");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      {/* CARD */}
      <div
        className="
      w-full max-w-sm h-screen bg-white overflow-hidden
      flex flex-col
      min-[800px]:max-w-5xl
      min-[800px]:h-[90vh]
      min-[800px]:flex-row
      rounded-b-[28px] min-[800px]:rounded-[28px]
      shadow-xl
      "
      >
        {/* HEADER */}
        <div
          className="
        bg-[#5b7cfa] text-white
        h-[40vh] w-full 
        rounded-b-[40px]
        relative
        px-5 pt-5 pb-8
        text-[white]
        min-[800px]:h-full
        min-[800px]:w-[45%]
        min-[800px]:rounded-b-none
        min-[800px]:rounded-l-[28px]
        "
        >
          {/* Top Bar */}
          <div className="h-[90px] flex items-center justify-between px-[10px]">
            <button className="text-[white] flex items-center gap-1 text-[20px] bg-transparent border-none cursor-pointer text-white">
              <FiChevronLeft />
              Profile
            </button>

            <button className="text-[white] bg-[#A0BDFF]/30 px-3 py-1 rounded-[15px] text-sm flex items-center gap-1 h-[40px] cursor-pointer border-none">
              Edit Profile
            </button>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mt-[45px]">
            <img
              src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
              className="
              w-24 h-24 rounded-[30px]
              min-[800px]:w-[clamp(180px,20vw,300px)]
              min-[800px]:h-[clamp(180px,20vw,300px)]
              "
            />

            <h2 className="mt-3 text-lg font-semibold mb-[0px]">
              {user?.username || user?.name || "User"}
            </h2>
            <p className="mt-[0px] text-sm text-white/80">
              Ph no: {user?.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div
          className="
        w-full h-[60vh] p-4 space-y-3 overflow-y-auto

        min-[800px]:h-full
        min-[800px]:w-[55%]
        min-[800px]:p-6
        "
        >
          <MenuItem icon={<FiUser />} label="About" />
          <MenuItem icon={<FiMail />} label="Email Address" />
          <MenuItem icon={<FaBirthdayCake />} label="Date of Birth" />
          <MenuItem icon={<MdWc />} label="Gender" />
          <MenuItem icon={<FiPhone />} label="Support" />
          <button
            className="w-full bg-[#5b7cfa] text-white py-2 rounded-[15px] mt-4"
            onClick={handleLogout}
          >
            Sign out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Row */
function MenuItem({ icon, label }) {
  return (
    <div className="bg-[black]/7 flex items-center justify-between bg-[#f6f8ff] mx-[20px] mt-[20px] px-[10px] pt-3 rounded-[15px] cursor-pointer hover:bg-[#eef1ff] transition">
      <div className="h-[60px]  flex items-center gap-3 text-[#5b7cfa]">
        <div className="text-lg bg-[black]/7 h-[40px] w-[40px] text-[25px] rounded-[10px]">
          <div className=" text-center mt-[5px]">{icon}</div>
        </div>
        <span className="ml-[20px] text-sm text-gray-700 text-[black]/70 text-[20px]">
          {label}
        </span>
      </div>
    </div>
  );
}
