import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle, linkText, linkTo, linkActionText }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-screen min-h-screen bg-[#BDE8F5] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#BDE8F5] to-[#E2F5FA]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="w-full max-w-[900px] h-[600px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel (Welcome / Info) */}
        <div className="hidden md:flex md:w-1/2 bg-[#1C4D8D] flex-col justify-center items-center px-10 text-white relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold leading-tight mb-4 tracking-wide">
              {title}
            </h1>
            <p className="text-lg text-white/90 font-light max-w-xs leading-relaxed">
              {subtitle}
            </p>

            {linkText && linkTo && (
              <p className="mt-8 text-lg font-medium">
                {linkText}{" "}
                <span
                  onClick={() => navigate(linkTo)}
                  className="cursor-pointer text-[#BDE8F5] underline decoration-2 decoration-[#BDE8F5]/50 hover:decoration-[#BDE8F5] hover:text-white transition-all duration-300"
                >
                  {linkActionText}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Right Panel (Content/Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
           {/* Mobile Header (Shown only on small screens) */}
           <div className="md:hidden text-center mb-8">
             <h2 className="text-2xl font-bold text-[#1C4D8D]">{title}</h2>
             <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
           </div>
           
           {children}
        </div>
      </div>
    </motion.div>
  );
}
