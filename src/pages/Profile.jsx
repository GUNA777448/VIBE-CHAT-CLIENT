// import {
//   FiChevronLeft,
//   FiEdit,
//   FiMail,
//   FiPhone,
//   FiLogOut,
//   FiUser,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../stores/useAuthStore";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, isAuthenticated, logout: logoutFromStore } = useAuthStore();

//   const handleLogout = () => {
//     // Use Zustand logout action which clears all state
//     logoutFromStore();
//     // Redirect to login page
//     navigate("/login");
//   };
//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//       {/* CARD */}
//       <div
//         className="
//       w-full max-w-sm h-screen bg-white overflow-hidden
//       flex flex-col
//       min-[800px]:max-w-5xl
//       min-[800px]:h-[90vh]
//       min-[800px]:flex-row
//       rounded-b-[28px] min-[800px]:rounded-[28px]
//       shadow-xl
//       "
//       >
//         {/* HEADER */}
//         <div
//           className="
//         bg-[#5b7cfa] text-white
//         h-[40vh] w-full 
//         rounded-b-[40px]
//         relative
//         px-5 pt-5 pb-8
//         text-[white]
//         min-[800px]:h-full
//         min-[800px]:w-[45%]
//         min-[800px]:rounded-b-none
//         min-[800px]:rounded-l-[28px]
//         "
//         >
//           {/* Top Bar */}
//           <div className="h-[90px] flex items-center justify-between px-[10px]">
//             <button className="text-[white] flex items-center gap-1 text-[20px] bg-transparent border-none cursor-pointer text-white">
//               <FiChevronLeft />
//               Profile
//             </button>

//             <button className="text-[white] bg-[#A0BDFF]/30 px-3 py-1 rounded-[15px] text-sm flex items-center gap-1 h-[40px] cursor-pointer border-none">
//               Edit Profile
//             </button>
//           </div>

//           {/* Avatar */}
//           <div className="flex flex-col items-center mt-[45px]">
//             <img
//               src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
//               className="
//               w-24 h-24 rounded-[30px]
//               min-[800px]:w-[clamp(180px,20vw,300px)]
//               min-[800px]:h-[clamp(180px,20vw,300px)]
//               "
//             />

//             <h2 className="mt-3 text-lg font-semibold mb-[0px]">
//               {user?.username || user?.name || "User"}
//             </h2>
//             <p className="mt-[0px] text-sm text-white/80">
//               Ph no: {user?.phoneNumber || "Not provided"}
//             </p>
//           </div>
//         </div>

//         {/* MENU */}
//         <div
//           className="
//         w-full h-[60vh] p-4 space-y-3 overflow-y-auto

//         min-[800px]:h-full
//         min-[800px]:w-[55%]
//         min-[800px]:p-6
//         "
//         >
//           <MenuItem icon={<FiUser />} label="About" />
//           <MenuItem icon={<FiMail />} label="Email Address" />
//           <MenuItem icon={<FaBirthdayCake />} label="Date of Birth" />
//           <MenuItem icon={<MdWc />} label="Gender" />
//           <MenuItem icon={<FiPhone />} label="Support" />
//           <button
//             className="w-full bg-[#5b7cfa] text-white py-2 rounded-[15px] mt-4"
//             onClick={handleLogout}
//           >
//             Sign out{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Reusable Row */
// function MenuItem({ icon, label }) {
//   return (
//     <div className="bg-[black]/7 flex items-center justify-between bg-[#f6f8ff] mx-[20px] mt-[20px] px-[10px]  rounded-[15px] cursor-pointer hover:bg-[#eef1ff] transition">
//       <div className="h-[60px]  flex items-center gap-3 text-[#5b7cfa]">
//         <div className="flex justify-center text-lg bg-[black]/7 h-[40px] w-[40px] text-[25px] rounded-[10px]">
//           <div className=" text-center mt-[5px]">{icon}</div>
//         </div>
//         <span className="ml-[20px] text-sm text-gray-700 text-[black]/70 text-[20px]">
//           {label}
//         </span>
//       </div>
//     </div>
//   );
// }












// import {
//   FiChevronLeft,
//   FiEdit,
//   FiMail,
//   FiPhone,
//   FiLogOut,
//   FiUser,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import useAuthStore from "../stores/useAuthStore";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout, setUser } = useAuthStore();

//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     phoneNumber: user?.phoneNumber || "",
//     about: user?.about || "",
//     dob: user?.dob || "",
//     gender: user?.gender || "",
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setUser(data.user); // update zustand
//       setIsEditing(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-sm h-screen bg-white flex flex-col min-[800px]:max-w-5xl min-[800px]:h-[90vh] min-[800px]:flex-row rounded-[28px] shadow-xl">

//         {/* LEFT */}
//         <div className="bg-[#5b7cfa] text-white w-full min-[800px]:w-[45%] p-6 relative">
//           <div className="flex justify-between items-center">
//             <button className="flex items-center gap-1 text-white">
//               <FiChevronLeft /> Profile
//             </button>

//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="bg-[#A0BDFF]/30 px-3 py-1 rounded-full flex items-center gap-2"
//             >
//               <FiEdit />
//               {isEditing ? "Cancel" : "Edit"}
//             </button>
//           </div>

//           <div className="flex flex-col items-center mt-10">
//             <img
//               src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
//               className="w-32 h-32 rounded-[30px]"
//             />

//             {isEditing ? (
//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-4 px-3 py-2 rounded text-black"
//               />
//             ) : (
//               <h2 className="mt-4 text-lg font-semibold">
//                 {user?.username}
//               </h2>
//             )}

//             <p className="text-sm opacity-80 mt-1">
//               Ph: {user?.phoneNumber || "Not provided"}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full min-[800px]:w-[55%] p-6 space-y-4 overflow-y-auto">

//           {/* ABOUT */}
//           <EditableRow
//             icon={<FiUser />}
//             label="About"
//             name="about"
//             value={formData.about}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           {/* EMAIL (readonly) */}
//           <DisplayRow
//             icon={<FiMail />}
//             label="Email"
//             value={user?.email}
//           />

//           {/* DOB */}
//           <EditableRow
//             icon={<FaBirthdayCake />}
//             label="Date of Birth"
//             name="dob"
//             type="date"
//             value={formData.dob}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           {/* GENDER */}
//           <EditableRow
//             icon={<MdWc />}
//             label="Gender"
//             name="gender"
//             value={formData.gender}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           {/* PHONE */}
//           <EditableRow
//             icon={<FiPhone />}
//             label="Phone"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           {isEditing && (
//             <button
//               onClick={handleSave}
//               className="w-full bg-[#5b7cfa] text-white py-2 rounded-xl mt-4"
//             >
//               Save Changes
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white py-2 rounded-xl mt-2"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// function EditableRow({ icon, label, name, value, editing, onChange, type = "text" }) {
//   return (
//     <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-center gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>

//       <div className="flex-1">
//         <p className="text-sm text-gray-500">{label}</p>

//         {editing ? (
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full border rounded px-2 py-1"
//           />
//         ) : (
//           <p className="text-gray-800">{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function DisplayRow({ icon, label, value }) {
//   return (
//     <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-center gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="text-gray-800">{value}</p>
//       </div>
//     </div>
//   );
// }
















// import {
//   FiChevronLeft,
//   FiEdit,
//   FiMail,
//   FiPhone,
//   FiLogOut,
//   FiUser,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import useAuthStore from "../stores/useAuthStore";

// const API_BASE = "http://localhost:5000/api/auth";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout, setUser } = useAuthStore();

//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     phoneNumber: user?.phoneNumber || "",
//     about: user?.about || "",
//     dob: user?.dob || "",
//     gender: user?.gender || "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");

//       if (!token) throw new Error("Not authenticated");

//       const res = await fetch(`${API_BASE}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const text = await res.text();

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         throw new Error("Server returned HTML instead of JSON");
//       }

//       if (!res.ok) throw new Error(data.message || "Update failed");

//       setUser(data.user);
//       setIsEditing(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//       {/* <div className="w-full max-w-sm h-screen bg-white flex flex-col min-[800px]:max-w-5xl min-[800px]:h-[90vh] min-[800px]:flex-row shadow-xl"> */}

//       <div
//         className="
//           w-full max-w-sm h-screen bg-white flex flex-col
//           min-[800px]:max-w-5xl
//           min-[800px]:h-[90vh]
//           min-[800px]:flex-row
//           min-[800px]:rounded-[30px]
//           shadow-xl
//           overflow-hidden
//         "
//       >


//         {/* LEFT */}
//         <div className="bg-[#5b7cfa] text-white w-full min-[800px]:w-[45%] p-6 relative">
//           <div className="flex justify-between items-center">
//             <button className="flex items-center gap-1 text-white">
//               <FiChevronLeft /> Profile
//             </button>

//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="bg-[#A0BDFF]/30 px-3 py-1 rounded-full flex items-center gap-2"
//             >
//               <FiEdit />
//               {isEditing ? "Cancel" : "Edit"}
//             </button>
//           </div>

//           <div className="flex flex-col items-center mt-10">
//             <img
//               src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
//               className=" w-24 h-24 rounded-[30px]
//                         min-[800px]:w-[clamp(160px,18vw,260px)]
//                         min-[800px]:h-[clamp(160px,18vw,260px)]
//                         transition-all duration-300"
//               alt="avatar"
//             />

//             {isEditing ? (
//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-4 px-3 py-2 rounded text-black"
//               />
//             ) : (
//               <h2 className="mt-4 text-lg font-semibold">
//                 {/* {user?.username} */}
//                 {user?.username || "Username"}
//               </h2>
//             )}

//             <p className="text-sm opacity-80 mt-1">
//               Ph: {user?.phoneNumber || "Not provided"}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full min-[800px]:w-[55%] p-6 space-y-4 overflow-y-auto">

//           <EditableRow
//             icon={<FiUser />}
//             label="About"
//             name="about"
//             value={formData.about}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           <DisplayRow
//             icon={<FiMail />}
//             label="Email"
//             value={user?.email}
//           />

//           <EditableRow
//             icon={<FaBirthdayCake />}
//             label="Date of Birth"
//             name="dob"
//             type="date"
//             value={formData.dob}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           <EditableRow
//             icon={<MdWc />}
//             label="Gender"
//             name="gender"
//             value={formData.gender}
//             editing={isEditing}
//             onChange={handleChange}
//           />



//           <EditableRow
//             icon={<FiPhone />}
//             label="Phone"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           {isEditing && (
//             <button
//               onClick={handleSave}
//               className="w-full bg-[#5b7cfa] text-white py-2 rounded-xl mt-4"
//             >
//               Save Changes
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white py-2 rounded-xl mt-2"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- helpers ---------- */

// function EditableRow({ icon, label, name, value, editing, onChange, type = "text" }) {
//   return (
//     <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-center gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>

//       <div className="flex-1">
//         <p className="text-sm text-gray-500">{label}</p>

//         {editing ? (
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full border rounded px-2 py-1"
//           />
//         ) : (
//           <p className="text-gray-800">{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function DisplayRow({ icon, label, value }) {
//   return (
//     <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-center gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="text-gray-800">{value}</p>
//       </div>
//     </div>
//   );
// }



















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
import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";

const API_BASE = "http://localhost:5000/api/auth";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    about: user?.about || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) throw new Error(data.message || "Update failed");

      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div
        className="
          w-full max-w-sm h-screen bg-white flex flex-col
          min-[800px]:max-w-5xl
          min-[800px]:h-[90vh]
          min-[800px]:flex-row
          min-[800px]:rounded-[30px]
          shadow-xl
          overflow-hidden
        "
      >
        {/* LEFT */}
        <div className="bg-[#5b7cfa] text-white w-full min-[800px]:w-[45%] p-6 relative">
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-1 text-white">
              <FiChevronLeft /> Profile
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#A0BDFF]/30 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <FiEdit />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="flex flex-col items-center mt-10">
            <img
              src="https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
              className="
                w-24 h-24 rounded-[30px]
                min-[800px]:w-[clamp(160px,18vw,260px)]
                min-[800px]:h-[clamp(160px,18vw,260px)]
                transition-all duration-300
              "
              alt="avatar"
            />

            {isEditing ? (
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-4 px-3 py-2 rounded text-black"
              />
            ) : (
              <h2 className="mt-4 text-lg font-semibold">
                {user?.username || "Username"}
              </h2>
            )}

            <p className="text-sm opacity-80 mt-1">
              Ph: {user?.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full min-[800px]:w-[55%] p-6 space-y-4 overflow-y-auto">

          <EditableRow
            icon={<FiUser />}
            label="About"
            name="about"
            value={formData.about}
            editing={isEditing}
            onChange={handleChange}
          />

          <DisplayRow
            icon={<FiMail />}
            label="Email"
            value={user?.email}
          />

          <EditableRow
            icon={<FaBirthdayCake />}
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            editing={isEditing}
            onChange={handleChange}
          />

          {/* ✅ Gender dropdown */}
          <EditableSelectRow
            icon={<MdWc />}
            label="Gender"
            name="gender"
            value={formData.gender}
            editing={isEditing}
            onChange={handleChange}
          />

          {/* Phone */}
          <EditableRow
            icon={<FiPhone />}
            label="Phone"
            name="phoneNumber"
            value={formData.phoneNumber}
            editing={isEditing}
            onChange={handleChange}
          />

          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full bg-[#5b7cfa] text-white py-2 rounded-xl mt-4"
            >
              Save Changes
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-xl mt-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function EditableRow({
  icon,
  label,
  name,
  value,
  editing,
  onChange,
  type = "text",
}) {
  return (
    <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-start gap-4">
      <div className="text-[#5b7cfa] text-xl mt-1">{icon}</div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>

        {editing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          <p className="text-gray-800">{value || "Not provided"}</p>
        )}
      </div>
    </div>
  );
}

/* ✅ Gender dropdown */
function EditableSelectRow({ icon, label, name, value, editing, onChange }) {
  return (
    <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-start gap-4">
      <div className="text-[#5b7cfa] text-xl mt-1">{icon}</div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>

        {editing ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded px-2 py-1 bg-white"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        ) : (
          <p className="text-gray-800 capitalize">
            {value || "Not provided"}
          </p>
        )}
      </div>
    </div>
  );
}

function DisplayRow({ icon, label, value }) {
  return (
    <div className="bg-[#f6f8ff] rounded-xl p-4 flex items-center gap-4">
      <div className="text-[#5b7cfa] text-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );
}
