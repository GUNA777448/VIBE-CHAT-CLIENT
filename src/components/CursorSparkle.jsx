// import { useEffect, useRef, useState } from "react";

// export default function CursorSparkle({ children }) {
//   const [sparkles, setSparkles] = useState([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const el = containerRef.current;
//     const colors = ["#facc15", "#60a5fa", "#34d399", "#fb7185"];

//     const sparkle = (x, y) => {
//       const count = Math.floor(Math.random() * 4) + 5; // 5–8
//       const s = Array.from({ length: count }).map((_, i) => ({
//         id: Date.now() + i,
//         x,
//         y,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       }));

//       setSparkles((p) => [...p, ...s]);
//       setTimeout(() => setSparkles((p) => p.slice(count)), 500);
//     };

//     const move = (e) => {
//       if (window.innerWidth >= 768) sparkle(e.clientX, e.clientY);
//     };

//     const click = (e) => {
//       if (window.innerWidth < 768) sparkle(e.clientX, e.clientY);
//     };

//     el.addEventListener("mousemove", move);
//     el.addEventListener("click", click);

//     return () => {
//       el.removeEventListener("mousemove", move);
//       el.removeEventListener("click", click);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative w-full h-full">
//       {/* ⭐ Sparkles */}
//       {sparkles.map((s) => (
//         <span
//           key={s.id}
//           className="fixed pointer-events-none text-xs animate-ping z-50"
//           style={{ left: s.x, top: s.y, color: s.color }}
//         >
//           ✦
//         </span>
//       ))}

//       {children}
//     </div>
//   );
// }













// import { useEffect, useRef, useState } from "react";

// export default function CursorSparkle({ children }) {
//   const [sparkles, setSparkles] = useState([]);
//   const ref = useRef(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const colors = ["#facc15", "#60a5fa", "#34d399", "#fb7185"];

//     const sparkle = (x, y) => {
//       const count = Math.floor(Math.random() * 4) + 5; // 5–8
//       const newSparkles = Array.from({ length: count }).map((_, i) => ({
//         id: Date.now() + i,
//         x,
//         y,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       }));

//       setSparkles((p) => [...p, ...newSparkles]);
//       setTimeout(() => {
//         setSparkles((p) => p.slice(count));
//       }, 500);
//     };

//     const handleMove = (e) => {
//       if (window.innerWidth >= 100) sparkle(e.clientX, e.clientY);
//     };

//     const handleClick = (e) => {
//       if (window.innerWidth < 100) sparkle(e.clientX, e.clientY);
//     };

//     window.addEventListener("mousemove", handleMove);
//     window.addEventListener("click", handleClick);

//     return () => {
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("click", handleClick);
//     };
//   }, []);

//   return (
//     <div ref={ref} className="relative min-h-screen w-screen overflow-hidden">
//       {/* ⭐ Sparkles */}
//       {sparkles.map((s) => (

//         <span
//           key={s.id}
//           className="fixed pointer-events-none text-xs animate-ping z-[9999]"
//           style={{ left: s.x, top: s.y, color: s.color }}
//         >
//           ✦
//         </span>
//       ))}

//       {children}
//     </div>
//   );
// }








import { useEffect, useState } from "react";

export default function CursorSparkle({ children }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const colors = ["#facc15", "#60a5fa", "#34d399", "#fb7185"];

    const sparkle = (x, y) => {
      const count = Math.floor(Math.random() * 4) + 5; // 5–8

      const newSparkles = Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2; // 360°
        const distance = Math.random() * 40 + 20;

        return {
          id: Date.now() + i,
          x,
          y,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      });

      setSparkles((p) => [...p, ...newSparkles]);

      setTimeout(() => {
        setSparkles((p) => p.slice(count));
      }, 700);
    };

    const move = (e) => sparkle(e.clientX, e.clientY);
    const click = (e) => sparkle(e.clientX, e.clientY);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* ⭐ Directional Sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="fixed pointer-events-none z-[9999] text-[20px]"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            "--dx": `${s.dx}px`,
            "--dy": `${s.dy}px`,
            animation: "sparkle-burst 700ms ease-out forwards",
          }}
        >
          ✦
        </span>
      ))}

      {children}

      {/* ✅ REAL directional animation */}
      <style>{`
        @keyframes sparkle-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(0.2);
          }
        }
      `}</style>
    </div>
  );
}
