// import React, { useState } from "react";
// import { FiUser, FiMail, FiPhone, FiLogOut, FiChevronRight } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { FiHelpCircle } from "react-icons/fi";

// export default function ProfileMenu({ user, onLogout, onUpdateUser }) {
//   return (
//     <div
//       className="
//         w-full h-[60vh] p-6 space-y-4 overflow-y-auto
//         bg-gray-50
//         min-[800px]:h-full
//         min-[800px]:w-[55%]
//         min-[800px]:p-10
//         min-[800px]:flex min-[800px]:flex-col min-[800px]:justify-center
//       "
//     >
//       <div className="space-y-4 max-w-md mx-auto w-full">
//         <h3 className="text-xl font-bold text-gray-800 mb-6 hidden min-[800px]:block">
//           Account Settings
//         </h3>

//         {/* About */}
//         <EditableTextItem
//           icon={<FiUser />}
//           label="About"
//           value={user?.about || "Available"}
//           onSave={(val) => onUpdateUser({ about: val })}
//         />

//         {/* Email (Read Only) */}
//         <ReadOnlyMenuItem
//           icon={<FiMail />}
//           label="Email"
//           value={user?.email || "user@example.com"}
//         />

//         {/* Date of Birth (Calendar) */}
//         <EditableDateItem
//           icon={<FaBirthdayCake />}
//           label="Birthday"
//           value={user?.birthday || ""}
//           onSave={(val) => onUpdateUser({ birthday: val })}
//         />

//         {/* Gender Dropdown */}
//         <EditableSelectItem
//           icon={<MdWc />}
//           label="Gender"
//           value={user?.gender || "Male"}
//           options={["Male", "Female", "Prefer not to say"]}
//           onSave={(val) => onUpdateUser({ gender: val })}
//         />

//         {/* Phone Number (updates ProfileHeader automatically 🔥) */}
//         <EditableTextItem
//           icon={<FiPhone />}
//           label="Phone"
//           value={user?.phoneNumber || ""}
//           onSave={(val) => onUpdateUser({ phoneNumber: val })}
//         />


//         {/* Support Link */}
//         <LinkMenuItem icon={<FiHelpCircle />} label="Support" />

//         {/* Logout */}
//         <button
//           className="w-full mt-8 bg-red-50 text-red-500 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 hover:shadow-sm transition-all duration-300 group cursor-pointer border-none"
//           onClick={onLogout}
//         >
//           <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- EDITABLE TEXT ITEM ---------------- */

// function EditableTextItem({ icon, label, value, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <input
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         />
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">{value || "Not added"}</span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- DATE PICKER ITEM ---------------- */

// function EditableDateItem({ icon, label, value, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <input
//           type="date"
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         />
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">
//           {value || "Not added"}
//         </span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- SELECT (GENDER) ITEM ---------------- */

// function EditableSelectItem({ icon, label, value, options, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <select
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         >
//           {options.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">{value}</span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- READ ONLY ITEM ---------------- */

// function ReadOnlyMenuItem({ icon, label, value }) {
//   return (
//     <div className="bg-white flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-100">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg">
//           {icon}
//         </div>
//         <div className="flex flex-col items-start">
//           <span className="text-sm font-medium text-gray-900">{label}</span>
//           <span className="text-xs text-gray-500 mt-0.5">{value}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- LINK ITEM ---------------- */

// function LinkMenuItem({ icon, label }) {
//   return (
//     <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
//           {icon}
//         </div>
//         <span className="text-sm font-medium text-gray-900">{label}</span>
//       </div>

//       <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
//     </div>
//   );
// }

// /* ---------------- BASE ITEM WRAPPER ---------------- */

// function BaseItem({ icon, label, children }) {
//   return (
//     <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
//       <div className="flex items-center gap-4 w-full">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
//           {icon}
//         </div>

//         <div className="flex flex-col items-start flex-grow">
//           <span className="text-sm font-medium text-gray-900">{label}</span>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiLogOut, FiChevronRight } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";

export default function ProfileMenu({ user, onLogout, onUpdateUser }) {
  return (
    <div
      className="
        w-full h-[60vh] p-6 space-y-4 overflow-y-auto
        bg-gray-50
        md:h-full
        md:w-[55%]
        md:p-10
        md:flex md:flex-col md:justify-center
      "
    >
      <div className="space-y-4 max-w-md mx-auto w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-6 hidden min-[800px]:block">
          Account Settings
        </h3>

        {/* 🔥 ABOUT (bio from backend) */}
        <EditableTextItem
          icon={<FiUser />}
          label="About"
          value={user?.bio || "Available"}
          onSave={(val) => onUpdateUser({ about: val })}
        />

        {/* Email (Read Only) */}
        <ReadOnlyMenuItem
          icon={<FiMail />}
          label="Email"
          value={user?.email || "user@example.com"}
        />

        {/* Birthday */}
        <EditableDateItem
          icon={<FaBirthdayCake />}
          label="Birthday"
          value={user?.birthday || ""}
          onSave={(val) => onUpdateUser({ birthday: val })}
        />

        {/* Gender */}
        <EditableSelectItem
          icon={<MdWc />}
          label="Gender"
          value={user?.gender || "Male"}
          options={["Male", "Female", "Prefer not to say"]}
          onSave={(val) => onUpdateUser({ gender: val })}
        />

        {/* 🔥 PHONE (mobile from backend) */}
        <EditableTextItem
          icon={<FiPhone />}
          label="Phone"
          value={user?.mobile || ""}
          onSave={(val) => onUpdateUser({ phoneNumber: val })}
        />

        {/* Support */}
        <LinkMenuItem icon={<FiHelpCircle />} label="Support" />

        {/* Logout */}
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

/* ---------------- EDITABLE TEXT ITEM ---------------- */

function EditableTextItem({ icon, label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  // 🔁 Sync input when backend updates user
  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  return (
    <BaseItem icon={icon} label={label}>
      {isEditing ? (
        <input
          className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
      ) : (
        <span className="text-xs text-gray-500 mt-0.5">
          {value || "Not added"}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-xs font-semibold text-green-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
        >
          Edit
        </button>
      )}
    </BaseItem>
  );
}

/* ---------------- DATE PICKER ITEM ---------------- */

function EditableDateItem({ icon, label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  return (
    <BaseItem icon={icon} label={label}>
      {isEditing ? (
        <input
          type="date"
          className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
      ) : (
        <span className="text-xs text-gray-500 mt-0.5">
          {value || "Not added"}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-xs font-semibold text-green-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
        >
          Edit
        </button>
      )}
    </BaseItem>
  );
}

/* ---------------- SELECT ITEM ---------------- */

function EditableSelectItem({ icon, label, value, options, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  return (
    <BaseItem icon={icon} label={label}>
      {isEditing ? (
        <select
          className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <span className="text-xs text-gray-500 mt-0.5">{value}</span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-xs font-semibold text-green-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
        >
          Edit
        </button>
      )}
    </BaseItem>
  );
}

/* ---------------- READ ONLY ITEM ---------------- */

function ReadOnlyMenuItem({ icon, label, value }) {
  return (
    <div className="bg-white flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg">
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          <span className="text-xs text-gray-500 mt-0.5">{value}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- LINK ITEM ---------------- */

function LinkMenuItem({ icon, label }) {
  return (
    <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>

      <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
    </div>
  );
}

/* ---------------- BASE ITEM ---------------- */

function BaseItem({ icon, label, children }) {
  return (
    <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4 w-full">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        <div className="flex flex-col items-start flex-grow">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {children}
        </div>
      </div>
    </div>
  );
}
