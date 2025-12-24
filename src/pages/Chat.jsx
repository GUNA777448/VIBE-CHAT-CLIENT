import { FiChevronLeft,} from "react-icons/fi";
import { useState, useRef } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "We are planning to go on a trip", sender: "other", time: "12:38" },
    { id: 2, text: "All of us, some friends from work might come too", sender: "me", time: "01:44" },
    { id: 3, text: "Aymen, are you free this weekend 😁😁😁", sender: "other", time: "11:58" },
  ]);

  const emojis = ["😀","😁","😂","😍","🥰","😎","😭","👍","🔥","❤️"]; //add
  const [showEmoji, setShowEmoji] = useState(false);//add
  const inputRef = useRef(null);//add

  const isMobile = window.innerWidth < 1025;

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col bg-black bg-center bg-cover text-[black]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[10px] bg-black/80 text-white">
        <div className="flex items-center gap-3">
          <div className="mx-[5px]"><FiChevronLeft /></div>
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="ml-[10px]">
            <p className="font-semibold my-[0px]">Fati Lara</p>
            <p className="text-xs text-[green] my-[0px]">Online</p>
          </div>
        </div>
        <span className="text-[20px] mr-[20px]">⋮</span>
      </div>

      {/* Messages */}
      {/* <div className="flex-1 overflow-y-auto px-[10px] py-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] px-[5px] pt-[10px] py-2 rounded-2xl text-sm relative bg-[skyblue] rounded-[15px] my-[10px]
              ${
                msg.sender === "me"
                  ? "ml-auto bg-violet-500 text-white rounded-br-none"
                  : "mr-auto bg-white text-black rounded-bl-none"
              }`}
          >
            {msg.text}
            <span className="block text-[10px] opacity-70 mt-1 text-right">
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div> */}




<div className="flex-1 overflow-y-auto px-[10px] py-3 space-y-3">
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`inline-flex flex-col max-w-[75%] px-[10px] py-[3px] rounded-[15px] text-sm bg-[skyblue] my-[3px]
          ${
            msg.sender === "me"
              ? "bg-violet-500 text-white rounded-br-none"
              : "bg-white text-black rounded-bl-none"
          }`}
      >
        {/* MESSAGE */}
        <div className="leading-snug">
          {msg.text}
        </div>

        {/* TIME – bottom right */}
        <div className="text-[10px] opacity-70 self-end mt-[2px]">
          {msg.time}
        </div>
      </div>
    </div>
  ))}
</div>






      {/* Input */}
      <div className="relative flex items-center gap-2 px-3 py-[5px] bg-white mx-[5px]">

        <div className="flex items-center bg-white rounded-full border h-[35px] px-2 flex-1">

          {/* 😊 Emoji button */}
          <div
            className="px-[8px] text-gray-500 cursor-pointer select-none"
            onMouseDown={(e) => {
              e.preventDefault(); // 🔑 CRITICAL
              if (isMobile) {
                setShowEmoji((prev) => !prev);
              }
            }}
          >
            😊
          </div>

          {/* INPUT (keyboard opens ONLY by tapping here) */}
          <input
            type="text"
            placeholder="Write a message"
            className="flex-1 bg-transparent outline-none text-sm px-2 border-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => isMobile && setShowEmoji(false)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />

          {/* + icon */}
          <div className="px-2 text-[26px] mx-[10px] cursor-pointer select-none">
            +
          </div>
        </div>

        {/* SEND */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => sendMessage(input)}
          className="h-[35px] w-[35px] rounded-full bg-violet-500 text-white flex items-center justify-center text-[18px] ml-[5px]"
        >
          ➤
        </button>

        {/* 😀 Emoji picker */}
        {showEmoji && isMobile && (
          <div className="absolute bottom-[45px] left-3 bg-white shadow-lg rounded-xl p-3 grid grid-cols-5 gap-2 z-50">
            {["😀","😁","😂","😍","🥰","😎","😭","👍","🔥","❤️"].map((e) => (
              <button
                key={e}
                className="text-xl"
                onMouseDown={(ev) => ev.preventDefault()}
                onClick={() => setInput((prev) => prev + e)}
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>



    </div>
  );
}










// import { useState, useRef, useEffect } from "react";

// export default function Chat() {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "I guess I am", sender: "me", time: "11:59" },
//     { id: 2, text: "We are planning to go on a trip", sender: "other", time: "12:38" },
//     { id: 3, type: "voice", sender: "other", current: "00:33", total: "01:38" },
//     { id: 4, text: "All of us, some Friends from work might come too", sender: "other", time: "01:44" },
//     { id: 5, text: "I guess I am", sender: "me", time: "11:59" },
//     { id: 6, text: "Aymen, are you free this weekend 😁😁😁", sender: "other", time: "11:58" },
//   ]);

//   const [input, setInput] = useState("");
//   const [sparkles, setSparkles] = useState([]);
//   const containerRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   /* ⭐ Sparkle effect */
//   useEffect(() => {
//     const el = containerRef.current;
//     const colors = ["#facc15", "#60a5fa", "#34d399", "#fb7185"];

//     const sparkle = (x, y) => {
//       const count = Math.floor(Math.random() * 4) + 5;
//       const s = Array.from({ length: count }).map((_, i) => ({
//         id: Date.now() + i,
//         x,
//         y,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       }));
//       setSparkles((p) => [...p, ...s]);
//       setTimeout(() => setSparkles((p) => p.slice(count)), 500);
//     };

//     const move = (e) => window.innerWidth >= 768 && sparkle(e.clientX, e.clientY);
//     const click = (e) => window.innerWidth < 768 && sparkle(e.clientX, e.clientY);

//     el.addEventListener("mousemove", move);
//     el.addEventListener("click", click);
//     return () => {
//       el.removeEventListener("mousemove", move);
//       el.removeEventListener("click", click);
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-screen w-screen flex flex-col bg-cover bg-center text-[white]"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1606112219348-204d7d8b94ee')",
//       }}
//     >
//       {/* ⭐ Sparkles */}
//       {sparkles.map((s) => (
//         <span
//           key={s.id}
//           className="fixed pointer-events-none text-xs animate-ping"
//           style={{ left: s.x, top: s.y, color: s.color }}
//         >
//           ✦
//         </span>
//       ))}

//       {/* Header */}
//       <div className="flex items-center gap-3 px-3 py-2 bg-white">
//         <span className="text-xl">←</span>
//         <img src="https://i.pravatar.cc/100" className="w-9 h-9 rounded-full" />
//         <div className="flex-1">
//           <p className="text-sm font-semibold">Fati Lara</p>
//           <p className="text-xs text-green-500">Online</p>
//         </div>
//         <span className="text-xl">⋮</span>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3 text-sm">
//         {messages.map((m) =>
//           m.type === "voice" ? (
//             <div key={m.id} className="flex gap-2 items-end">
//               <img src="https://i.pravatar.cc/100" className="w-7 h-7 rounded-full" />
//               <div>
//                 <div className="bg-violet-200 px-3 py-2 rounded-2xl rounded-bl-none max-w-[70%]">
//                   <input
//                     type="range"
//                     defaultValue={33}
//                     className="w-full accent-violet-500"
//                   />
//                   <div className="flex justify-between text-[10px] text-gray-600 mt-1">
//                     <span>{m.current}</span>
//                     <span>{m.total}</span>
//                   </div>
//                 </div>
//                 <p className="text-[10px] text-gray-400 mt-1">{m.total}</p>
//               </div>
//             </div>
//           ) : m.sender === "other" ? (
//             <div key={m.id} className="flex gap-2 items-end">
//               <img src="https://i.pravatar.cc/100" className="w-7 h-7 rounded-full" />
//               <div>
//                 <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-none max-w-[70%]">
//                   {m.text}
//                 </div>
//                 <p className="text-[10px] text-gray-400 mt-1">{m.time}</p>
//               </div>
//             </div>
//           ) : (
//             <div key={m.id} className="flex justify-end">
//               <div>
//                 <div className="bg-violet-300 text-white px-3 py-2 rounded-2xl rounded-br-none max-w-[70%] ml-auto">
//                   {m.text}
//                 </div>
//                 <p className="text-[10px] text-gray-400 mt-1 text-right">
//                   {m.time}
//                 </p>
//               </div>
//             </div>
//           )
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex items-center gap-2 px-3 py-2 bg-white">
//         <input
//           placeholder="Write a Message"
//           className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
//         />
//         <button className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center">
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// }
