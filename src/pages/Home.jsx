import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen bg-[#0f172a] overflow-hidden text-white flex flex-col items-center justify-center">
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
           <span className="text-sm font-medium tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
             ✨ The future of messaging is here
           </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-400 drop-shadow-lg">
          Welcome Back!
        </h1>
        
        <p className="max-w-md md:max-w-xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light">
         Enter your personal details to access your employee account and start vibing with your team.
        </p> 

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-sm justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="
              flex-1 px-8 py-4 rounded-full 
              bg-gradient-to-r from-[#3f63c5] to-[#4b6cff] 
              text-white font-semibold text-lg
              shadow-[0_0_20px_rgba(63,99,197,0.4)]
              hover:shadow-[0_0_30px_rgba(63,99,197,0.6)]
              transition-all duration-300 border-none cursor-pointer
            "
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="
              flex-1 px-8 py-4 rounded-full 
              bg-white/10 backdrop-blur-md border border-white/20
              text-white font-semibold text-lg
              hover:bg-white/20 hover:border-white/40
              transition-all duration-300 cursor-pointer
            "
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Footer info / Decorative */}
      <div className="absolute bottom-8 text-white/30 text-xs tracking-widest uppercase">
        Vibe Chat © 2026
      </div>

    </div>
  );
}
