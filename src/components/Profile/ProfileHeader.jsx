// import React, { useRef, useState } from "react";
// import { FiChevronLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function ProfileHeader({ user, onBack }) {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [previewImage, setPreviewImage] = useState(
//     user?.avatar ||
//       "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
//   );

//   // Open file picker when clicking Edit Profile
//   const handleEditProfile = () => {
//     fileInputRef.current.click();
//   };

//   // When user selects a new image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);

//       // Later we will upload this file to backend here
//       console.log("Selected new avatar:", file);
//     }
//   };

//   return (
//     <div
//       className="
//         bg-gradient-to-br from-[#5b7cfa] to-[#4b6cff] text-white
//         h-[40vh] w-full 
//         rounded-b-[40px]
//         relative
//         px-6 pt-6 pb-10
//         flex flex-col
//         min-[800px]:h-full
//         min-[800px]:w-[45%]
//         min-[800px]:rounded-b-none
//         min-[800px]:rounded-l-[30px]
//         shadow-lg z-10
//       "
//     >
//       {/* Header buttons */}
//       <div className="flex items-center justify-between mb-8">
//         <button
//           onClick={onBack}
//           className="text-white flex items-center gap-2 text-lg font-medium bg-transparent border-none cursor-pointer hover:opacity-80 transition"
//         >
//           <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//             <FiChevronLeft className="text-xl" />
//           </div>
//           <span className="hidden sm:inline">Back</span>
//         </button>

//         <button
//           onClick={handleEditProfile}
//           className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/10 hover:bg-white/30 transition shadow-sm"
//         >
//           Edit Profile
//         </button>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Avatar Section */}
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <div className="relative group">
//           {/* Glow effect */}
//           <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/40 transition-all duration-500"></div>

//           <img
//             src={previewImage}
//             className="
//               relative
//               w-32 h-32 rounded-[35px] object-cover
//               border-[4px] border-white/30
//               shadow-2xl
//               min-[800px]:w-[clamp(180px,20vw,260px)]
//               min-[800px]:h-[clamp(180px,20vw,260px)]
//               transform group-hover:scale-[1.02] transition-transform duration-500
//             "
//             alt="Profile Avatar"
//           />
//         </div>

//         <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight">
//           {user?.username || user?.name || "User"}
//         </h2>

//         <p className="mt-2 text-white/80 font-light tracking-wide bg-black/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
//           {user?.phoneNumber || "No phone number added"}
//         </p>
//       </div>
//     </div>
//   );
// }

















// import React, { useRef, useState, useEffect } from "react";
// import { FiChevronLeft } from "react-icons/fi";

// export default function ProfileHeader({ user, onBack, onUpdateUser }) {
//   const fileInputRef = useRef(null);

//   const defaultAvatar =
//     "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";

//   const [previewImage, setPreviewImage] = useState(
//     user?.avatar || defaultAvatar
//   );

//   /* 🔁 Sync avatar when profile reloads from DB */
//   useEffect(() => {
//     if (user?.avatar) {
//       setPreviewImage(user.avatar);
//     } else {
//       setPreviewImage(defaultAvatar);
//     }
//   }, [user]);

//   const handleEditProfile = () => {
//     fileInputRef.current.click();
//   };

//   /* 🔥 Upload & save new profile picture */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64Image = reader.result;

//       // Preview instantly
//       setPreviewImage(base64Image);

//       // 🔥 Send to backend through Profile.jsx
//       onUpdateUser({
//         avatar: base64Image,
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div
//       className="
//         bg-gradient-to-br from-[#5b7cfa] to-[#4b6cff] text-white
//         h-[40vh] w-full 
//         rounded-b-[40px]
//         px-6 pt-6 pb-10
//         flex flex-col
//         min-[800px]:h-full
//         min-[800px]:w-[45%]
//         min-[800px]:rounded-l-[30px]
//         shadow-lg
//       "
//     >
//       {/* Header buttons */}
//       <div className="flex items-center justify-between mb-8">
//         <button
//           onClick={onBack}
//           className="text-white flex items-center gap-2 hover:opacity-80 transition"
//         >
//           <FiChevronLeft className="text-xl" />
//           <span className="hidden sm:inline">Back</span>
//         </button>

//         <button
//           onClick={handleEditProfile}
//           className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm hover:bg-white/30 transition"
//         >
//           Edit Profile
//         </button>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Avatar section */}
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <img
//           src={previewImage}
//           className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
//           alt="Profile Avatar"
//         />

//         <h2 className="mt-6 text-2xl font-bold tracking-tight">
//           {user?.username || "User"}
//         </h2>

//         {/* 🔥 SHOW PHONE FROM BACKEND FIELD (mobile) */}
//         <p className="mt-2 text-white/80 text-sm">
//           {user?.mobile || "No phone number added"}
//         </p>
//       </div>
//     </div>
//   );
// }









import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function ProfileHeader({ user, onBack, onUpdateUser }) {
  const fileInputRef = useRef(null);

  const defaultAvatar =
    "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";

  const [previewImage, setPreviewImage] = useState(
    user?.avatar || defaultAvatar
  );

  /* 🔁 Sync avatar when profile reloads from DB */
  useEffect(() => {
    if (user?.avatar) {
      setPreviewImage(user.avatar);
    } else {
      setPreviewImage(defaultAvatar);
    }
  }, [user]);

  // Open file picker
  const handleEditProfile = () => {
    fileInputRef.current.click();
  };

  /* 🔥 Upload & save new profile picture */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      // Preview instantly
      setPreviewImage(base64Image);

      // 🔥 Send to backend through Profile.jsx
      onUpdateUser({
        avatar: base64Image,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className="
        bg-gradient-to-br from-[#5b7cfa] via-[#4b6cff] to-[#3a5ce8] text-white
        h-[40vh] w-full 
        rounded-b-[40px]
        relative overflow-hidden
        px-6 pt-6 pb-10
        flex flex-col
        md:h-full
        md:w-[45%]
        md:rounded-b-none
        md:rounded-l-[30px]
        shadow-lg z-10
      "
    >
      {/* Header buttons */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 text-lg font-medium hover:opacity-80 transition"
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
            <FiChevronLeft className="text-xl" />
          </div>
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        <button
          onClick={handleEditProfile}
          className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/10 hover:bg-white/30 transition shadow-sm"
        >
          Edit Profile
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleImageChange}
        />
      </div>

      {/* Avatar Section — ORIGINAL STYLE 🔥 */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/40 transition-all duration-500"></div>

          <img
            src={previewImage}
            className="
              relative
              w-32 h-32 rounded-[35px] object-cover
              border-[4px] border-white/30
              shadow-2xl
              md:w-[clamp(180px,20vw,260px)]
              md:h-[clamp(180px,20vw,260px)]


              transform group-hover:scale-[1.02] transition-transform duration-500
            "
            alt="Profile Avatar"
          />
        </div>

        <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight">
          {user?.username || "User"}
        </h2>

        {/* 🔥 SHOW PHONE FROM BACKEND FIELD */}
        <p className="mt-2 text-white/80 font-light tracking-wide bg-black/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {user?.mobile || "No phone number added"}
        </p>
      </div>
    </div>
  );
}
