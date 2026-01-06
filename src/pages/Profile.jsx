// import {
//   FiChevronLeft,
//   FiEdit,
//   FiMail,
//   FiPhone,
//   FiLogOut,
//   FiUser,
//   FiCamera,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import useAuthStore from "../stores/useAuthStore";

// const API_BASE = "http://localhost:5000/api/auth";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout, setUser } = useAuthStore();
//   const fileRef = useRef(null);

//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
//   const [avatarFile, setAvatarFile] = useState(null);

//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     phoneNumber: user?.phoneNumber || "",
//     about: user?.about || "",
//     dob: user?.dob || "",
//     gender: user?.gender || "",
//   });

//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   /* 📸 Profile Photo Upload */
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setAvatarFile(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");

//       if (!token) throw new Error("Not authenticated");

//       const payload = {
//         ...formData,
//         avatar: avatarFile
//           ? await toBase64(avatarFile)
//           : avatarPreview,
//       };

//       const res = await fetch(`${API_BASE}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

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
//     <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-[40%_60%]">

//         {/* LEFT – HEADER */}
//         <div className="relative bg-gradient-to-br from-[#5b7cfa] to-[#7f9cff] p-8 text-white">
//           <button className="flex items-center gap-2 opacity-90">
//             <FiChevronLeft /> Profile
//           </button>

//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="absolute top-6 right-6 bg-white/20 px-4 py-1 rounded-full flex items-center gap-2"
//           >
//             <FiEdit />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>

//           {/* Avatar */}
//           <div className="flex flex-col items-center mt-14 relative">
//             <div
//               className="relative group cursor-pointer"
//               onClick={() => isEditing && fileRef.current.click()}
//             >
//               <img
//                 src={
//                   avatarPreview ||
//                   "https://i.pravatar.cc/300"
//                 }
//                 className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl object-cover"
//                 alt="avatar"
//               />

//               {isEditing && (
//                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <FiCamera className="text-2xl" />
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileRef}
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handlePhotoChange}
//             />

//             {isEditing ? (
//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-4 px-4 py-2 rounded-xl text-black text-center"
//               />
//             ) : (
//               <h2 className="mt-4 text-xl font-semibold">
//                 {user?.username}
//               </h2>
//             )}

//             <p className="opacity-80 mt-1">
//               {user?.phoneNumber || "No phone"}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT – DETAILS */}
//         <div className="p-6 space-y-4 overflow-y-auto">
//           <EditableRow
//             icon={<FiUser />}
//             label="About"
//             name="about"
//             value={formData.about}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           <DisplayRow icon={<FiMail />} label="Email" value={user?.email} />

//           <EditableRow
//             icon={<FaBirthdayCake />}
//             label="Date of Birth"
//             name="dob"
//             type="date"
//             value={formData.dob}
//             editing={isEditing}
//             onChange={handleChange}
//           />

//           <EditableSelectRow
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
//               className="w-full bg-[#5b7cfa] text-white py-3 rounded-xl font-medium"
//             >
//               Save Changes
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white py-3 rounded-xl"
//           >
//             <FiLogOut className="inline mr-2" />
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- helpers ---------- */

// const toBase64 = (file) =>
//   new Promise((res, rej) => {
//     const reader = new FileReader();
//     reader.onload = () => res(reader.result);
//     reader.onerror = rej;
//     reader.readAsDataURL(file);
//   });

// function EditableRow({ icon, label, name, value, editing, onChange, type = "text" }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
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
//           <p>{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function EditableSelectRow({ icon, label, name, value, editing, onChange }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-500">{label}</p>
//         {editing ? (
//           <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         ) : (
//           <p className="capitalize">{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function DisplayRow({ icon, label, value }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p>{value}</p>
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
//   FiCamera,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import useAuthStore from "../stores/useAuthStore";

// const API_BASE = "http://localhost:5000/api/auth";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout, setUser } = useAuthStore();
//   const fileRef = useRef(null);

//   // 🔒 Guard: if user not loaded yet
//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
//   const [avatarFile, setAvatarFile] = useState(null);

//   const [formData, setFormData] = useState({
//     username: user.username || "",
//     phoneNumber: user.phoneNumber || "",
//     about: user.about || "",
//     dob: user.dob || "",
//     gender: user.gender || "",
//   });

//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setAvatarFile(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     try {
//       const token =
//   localStorage.getItem("token") ||
//   sessionStorage.getItem("token");

//       if (!token) {
//         alert("Session expired. Login again.");
//         return navigate("/login");
//       }

//       const payload = {
//         ...formData,
//         avatar: avatarFile ? await toBase64(avatarFile) : avatarPreview,
//       };

//       const res = await fetch(`${API_BASE}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const text = await res.text();
//       let data;

//       try {
//         data = JSON.parse(text);
//       } catch {
//         throw new Error("Server error");
//       }

//       if (!res.ok) throw new Error(data.message);

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
//     <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-[40%_60%]">

//         {/* LEFT */}
//         <div className="relative bg-gradient-to-br from-[#5b7cfa] to-[#7f9cff] p-8 text-white">
//           <button className="flex items-center gap-2 opacity-90">
//             <FiChevronLeft /> Profile
//           </button>

//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="absolute top-6 right-6 bg-white/20 px-4 py-1 rounded-full flex items-center gap-2"
//           >
//             <FiEdit />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>

//           <div className="flex flex-col items-center mt-14">
//             <div
//               className="relative group cursor-pointer"
//               onClick={() => isEditing && fileRef.current.click()}
//             >
//               <img
//                 src={avatarPreview || "https://i.pravatar.cc/300"}
//                 className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl object-cover"
//                 alt="avatar"
//               />

//               {isEditing && (
//                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <FiCamera className="text-2xl" />
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileRef}
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handlePhotoChange}
//             />

//             {isEditing ? (
//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-4 px-4 py-2 rounded-xl text-black text-center"
//               />
//             ) : (
//               <h2 className="mt-4 text-xl font-semibold">
//                 {user.username}
//               </h2>
//             )}

//             <p className="opacity-80 mt-1">
//               {user.phoneNumber || "No phone"}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="p-6 space-y-4 overflow-y-auto">
//           <EditableRow icon={<FiUser />} label="About" name="about" value={formData.about} editing={isEditing} onChange={handleChange} />
//           <DisplayRow icon={<FiMail />} label="Email" value={user.email} />
//           <EditableRow icon={<FaBirthdayCake />} label="Date of Birth" name="dob" type="date" value={formData.dob} editing={isEditing} onChange={handleChange} />
//           <EditableSelectRow icon={<MdWc />} label="Gender" name="gender" value={formData.gender} editing={isEditing} onChange={handleChange} />
//           <EditableRow icon={<FiPhone />} label="Phone" name="phoneNumber" value={formData.phoneNumber} editing={isEditing} onChange={handleChange} />

//           {isEditing && (
//             <button onClick={handleSave} className="w-full bg-[#5b7cfa] text-white py-3 rounded-xl">
//               Save Changes
//             </button>
//           )}

//           <button onClick={handleLogout} className="w-full bg-red-500 text-white py-3 rounded-xl">
//             <FiLogOut className="inline mr-2" />
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* helpers */

// const toBase64 = (file) =>
//   new Promise((res, rej) => {
//     const reader = new FileReader();
//     reader.onload = () => res(reader.result);
//     reader.onerror = rej;
//     reader.readAsDataURL(file);
//   });

// function EditableRow({ icon, label, name, value, editing, onChange, type = "text" }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-500">{label}</p>
//         {editing ? (
//           <input type={type} name={name} value={value} onChange={onChange} className="w-full border rounded px-2 py-1" />
//         ) : (
//           <p>{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function EditableSelectRow({ icon, label, name, value, editing, onChange }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-500">{label}</p>
//         {editing ? (
//           <select name={name} value={value} onChange={onChange} className="w-full border rounded px-2 py-1">
//             <option value="">Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         ) : (
//           <p className="capitalize">{value || "Not provided"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function DisplayRow({ icon, label, value }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow flex gap-4">
//       <div className="text-[#5b7cfa] text-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p>{value}</p>
//       </div>
//     </div>
//   );
// }



















// import {
//   FiEdit,
//   FiMail,
//   FiPhone,
//   FiUser,
//   FiCamera,
//   FiLogOut,
// } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import useAuthStore from "../stores/useAuthStore";

// const API_BASE = "http://localhost:5000/api/auth";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout, setUser } = useAuthStore();
//   const fileRef = useRef(null);

//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading profile...
//       </div>
//     );
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
//   const [avatarFile, setAvatarFile] = useState(null);

//   const [formData, setFormData] = useState({
//     username: user.username || "",
//     phoneNumber: user.phoneNumber || "",
//     about: user.about || "",
//     dob: user.dob || "",
//     gender: user.gender || "",
//   });

//   const handleChange = (e) =>
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setAvatarFile(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");

//       if (!token) return navigate("/login");

//       const payload = {
//         ...formData,
//         avatar: avatarFile ? await toBase64(avatarFile) : avatarPreview,
//       };

//       const res = await fetch(`${API_BASE}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setUser(data.user);
//       setIsEditing(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <>
//       {/* ================= MOBILE ================= */}
//       <div className="md:hidden min-h-screen bg-[#eef3f7]">

//         {/* 🔵 BLUE HEADER — 30vh */}
//         <div className="h-[30vh] bg-[#0b4fd6] relative">
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="absolute top-4 right-4 text-white"
//           >
//             <FiEdit />
//           </button>
//         </div>

//         {/* CARD */}
//         <div className="-mt-24 px-4 pb-6">
//           <div className="bg-white rounded-3xl shadow px-6 pt-24 pb-6 relative">

//             {/* AVATAR */}
//             <div
//               className="absolute -top-20 left-1/2 -translate-x-1/2 cursor-pointer"
//               onClick={() => isEditing && fileRef.current.click()}
//             >
//               <img
//                 src={avatarPreview || "https://i.pravatar.cc/300"}
//                 className="w-36 h-36 rounded-full border-4 border-white object-cover"
//                 alt="avatar"
//               />

//               {isEditing && (
//                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
//                   <FiCamera className="text-white" />
//                 </div>
//               )}
//             </div>

//             {/* NAME */}
//             <div className="text-center">
//               {isEditing ? (
//                 <input
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="text-lg font-semibold text-center outline-none border-b"
//                 />
//               ) : (
//                 <h2 className="font-semibold text-lg">{user.username}</h2>
//               )}
//               <p className="text-sm text-gray-500">UI/UX Designer</p>
//             </div>

//             {/* INFO */}
//             {/* INFO */}
// <div className="mt-8 space-y-5">

// {/* About */}
//   <MobileRow icon={<FiUser />}>
//     {isEditing ? (
//       <input
//         name="about"
//         value={formData.about}
//         onChange={handleChange}
//         className="outline-none w-full"
//       />
//     ) : (
//       formData.about || "Not provided"
//     )}
//   </MobileRow>



//   {/* Email */}
//   <MobileRow icon={<FiMail />}>
//     {user.email}
//   </MobileRow>

  

//   {/* Date of Birth ✅ */}
//   <MobileRow icon={<FaBirthdayCake />}>
//     {isEditing ? (
//       <input
//         type="date"
//         name="dob"
//         value={formData.dob}
//         onChange={handleChange}
//         className="outline-none w-full"
//       />
//     ) : (
//       formData.dob || "Not provided"
//     )}
//   </MobileRow>

//   {/* Gender ✅ */}
//   <MobileRow icon={<MdWc />}>
//     {isEditing ? (
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         className="outline-none w-full bg-transparent"
//       >
//         <option value="">Select</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//     ) : (
//       formData.gender || "Not provided"
//     )}
//   </MobileRow>
//     {/* Phone */}
//   <MobileRow icon={<FiPhone />}>
//     {isEditing ? (
//       <input
//         name="phoneNumber"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         className="outline-none w-full"
//       />
//     ) : (
//       formData.phoneNumber || "Not provided"
//     )}
//   </MobileRow>

// </div>


//             {/* SAVE */}
//             {isEditing && (
//               <button
//                 onClick={handleSave}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6"
//               >
//                 Save Changes
//               </button>
//             )}

//             {/* LOGOUT */}
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="w-full bg-red-500 text-white py-3 rounded-xl mt-4"
//             >
//               <FiLogOut className="inline mr-2" />
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= DESKTOP (UNCHANGED) ================= */}
//       <div className="hidden md:flex min-h-screen bg-gray-100 items-center justify-center p-6">
//         <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

//           {/* LEFT */}
//           <div className="w-[40%] bg-[#6f8efb] text-white flex flex-col items-center justify-center relative">
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="flex gap-[10px] text-center absolute top-6 right-6 bg-white/20 px-4 py-1 rounded-full"
//             >
//               <FiEdit /> Edit
//             </button>

//             <div
//               className="cursor-pointer"
//               onClick={() => isEditing && fileRef.current.click()}
//             >
//               <img
//                 src={avatarPreview || "https://i.pravatar.cc/300"}
//                 className="
//                   rounded-full border-4 border-white object-cover
//                   w-[clamp(160px,18vw,260px)]
//                   h-[clamp(160px,18vw,260px)]
//                 "
//                 alt="avatar"
//               />
//             </div>

//             <h2 className="mt-4 text-xl font-semibold">
//               {user.username}
//             </h2>
//             <p className="opacity-80">
//               {formData.phoneNumber || "No phone"}
//             </p>
//           </div>

//           {/* RIGHT */}
//           <div className="w-[60%] p-8 space-y-4">
//             <InfoCard icon={<FiUser />} label="About" value={formData.about} />
//             <InfoCard icon={<FiMail />} label="Email" value={user.email} />
//             <InfoCard icon={<FaBirthdayCake />} label="DOB" value={formData.dob} />
//             <InfoCard icon={<MdWc />} label="Gender" value={formData.gender} />
//             <InfoCard icon={<FiPhone />} label="Phone" value={formData.phoneNumber} />

//             {isEditing && (
//               <button
//                 onClick={handleSave}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6"
//               >
//                 Save Changes
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* FILE INPUT */}
//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={handlePhotoChange}
//       />
//     </>
//   );
// }

// /* ================= HELPERS ================= */

// const toBase64 = (file) =>
//   new Promise((res, rej) => {
//     const reader = new FileReader();
//     reader.onload = () => res(reader.result);
//     reader.onerror = rej;
//     reader.readAsDataURL(file);
//   });

// function MobileRow({ icon, children }) {
//   return (
//     <div className="flex items-center gap-4">
//       <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
//         {icon}
//       </div>
//       <p className="text-sm text-gray-700 flex-1">
//         {children}
//       </p>
//     </div>
//   );
// }

// function InfoCard({ icon, label, value }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
//       <div className="text-xl text-gray-600">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="font-medium">{value || "Not provided"}</p>
//       </div>
//     </div>
//   );
// }





















import {
  FiEdit,
  FiMail,
  FiPhone,
  FiUser,
  FiCamera,
  FiLogOut,
} from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import useAuthStore from "../stores/useAuthStore";

const API_BASE = "http://localhost:5000/api/auth";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();
  const fileRef = useRef(null);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    username: user.username || "",
    phoneNumber: user.phoneNumber || "",
    about: user.about || "",
    dob: user.dob || "",
    gender: user.gender || "",
  });

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) return navigate("/login");

      const payload = {
        ...formData,
        avatar: avatarFile ? await toBase64(avatarFile) : avatarPreview,
      };

      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden min-h-screen bg-[#eef3f7]">
        <div className="h-[30vh] bg-[#0b4fd6] relative">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 text-white"
          >
            <FiEdit />
          </button>
        </div>

        <div className="-mt-24 px-4 pb-6">
          <div className="bg-white rounded-3xl shadow px-6 pt-24 pb-6 relative">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 cursor-pointer"
              onClick={() => isEditing && fileRef.current.click()}
            >
              <img
                src={avatarPreview || "https://i.pravatar.cc/300"}
                className="w-36 h-36 rounded-full border-4 border-white object-cover"
                alt="avatar"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <FiCamera className="text-white" />
                </div>
              )}
            </div>

            <div className="text-center">
              {isEditing ? (
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="text-lg font-semibold text-center outline-none border-b"
                />
              ) : (
                <h2 className="font-semibold text-lg">{user.username}</h2>
              )}
            </div>

            <div className="mt-8 space-y-5">
              <MobileRow icon={<FiUser className="text-[25px]" />}>
                {isEditing ? (
                  <input name="about" value={formData.about} onChange={handleChange} className="w-full outline-none" />
                ) : (
                  formData.about || "Not provided"
                )}
              </MobileRow>

              <MobileRow icon={<FiMail className="text-[25px]" />}>{user.email}</MobileRow>

              <MobileRow icon={<FaBirthdayCake className="text-[25px]" />}>
                {isEditing ? (
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full outline-none" />
                ) : (
                  formData.dob || "Not provided"
                )}
              </MobileRow>

              <MobileRow icon={<MdWc className="text-[25px]" />}>
                {isEditing ? (
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full outline-none">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  formData.gender || "Not provided"
                )}
              </MobileRow>

              <MobileRow icon={<FiPhone className="text-[25px]" />}>
                {isEditing ? (
                  <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full outline-none" />
                ) : (
                  formData.phoneNumber || "Not provided"
                )}
              </MobileRow>
            </div>

            {isEditing && (
              <button onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6">
                Save Changes
              </button>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full bg-red-500 text-white py-3 rounded-xl mt-4"
            >
              <FiLogOut className="inline mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex min-h-screen bg-gray-100 items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex">
          <div className="w-[40%] bg-[#6f8efb] text-white flex flex-col items-center justify-center relative">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-6 right-6 bg-white/20 px-4 py-1 rounded-full flex gap-2"
            >
              <FiEdit /> Edit
            </button>

            <div
  className="relative cursor-pointer"
  onClick={() => isEditing && fileRef.current.click()}
>
  <img
    src={avatarPreview || "https://i.pravatar.cc/300"}
    className="
      rounded-full border-4 border-white object-cover
      w-[clamp(160px,18vw,260px)]
      h-[clamp(160px,18vw,260px)]
    "
    alt="avatar"
  />

  {isEditing && (
    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
      <FiCamera className="text-white text-xl" />
    </div>
  )}
</div>


            <h2 className="mt-4 text-xl font-semibold">{user.username}</h2>
            <p className="opacity-80">{formData.phoneNumber || "No phone"}</p>
          </div>

          <div className="w-[60%] p-8 space-y-4">
            <EditableInfo icon={<FiUser  className="text-[25px] mt-[8px]"/>} label="About" name="about" value={formData.about} isEditing={isEditing} onChange={handleChange} />
            <EditableInfo icon={<FiMail className="text-[25px] mt-[8px]" />} label="Email" value={user.email} />
            <EditableInfo icon={<FaBirthdayCake className="text-[25px] mt-[8px]" />} label="DOB" name="dob" type="date" value={formData.dob} isEditing={isEditing} onChange={handleChange} />
            <EditableInfo icon={<MdWc className="text-[25px] mt-[8px]" />} label="Gender" name="gender" value={formData.gender} isEditing={isEditing} onChange={handleChange} options />
            <EditableInfo icon={<FiPhone className="text-[25px] mt-[8px]" />} label="Phone" name="phoneNumber" value={formData.phoneNumber} isEditing={isEditing} onChange={handleChange} />

            {isEditing && (
              <button onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      <input ref={fileRef} type="file" hidden accept="image/*" onChange={handlePhotoChange} />
    </>
  );
}

/* ================= HELPERS ================= */

const toBase64 = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

function MobileRow({ icon, children }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
}

function EditableInfo({ icon, label, name, value, isEditing, onChange, type = "text", options }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
      <div className="text-xl text-gray-600">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {isEditing && name ? (
          options ? (
            <select name={name} value={value} onChange={onChange} className="w-full outline-none bg-transparent border-b">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <input type={type} name={name} value={value} onChange={onChange} className="w-full outline-none bg-transparent border-b" />
          )
        ) : (
          <p className="font-medium">{value || "Not provided"}</p>
        )}
      </div>
    </div>
  );
}
