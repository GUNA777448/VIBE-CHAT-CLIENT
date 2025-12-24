import { useNavigate } from "react-router-dom";
import CursorSparkle from "../components/CursorSparkle";

export default function Home() {
  const navigate = useNavigate();

  return (
    <CursorSparkle>
    <div className="flex flex-col justify-between items-center  w-screen h-screen md:h-screen bg-[#243B55] bg-cover bg-center bg-no-repeat text-[white]">
      {/* Top Spacer (mobile friendly) */}
      <div className="flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-center  text-[32px] sm:text-3xl md:text-4xl font-semibold pl-3 mt-[150px]">Welcome Back!</h1>
        <p className="max-w-xs sm:max-w-sm md:max-w-md text-white/90 text-sm sm:text-base">
         Enter personal details to your employee account
       </p> 
      </div>
      {/* Bottom Buttons */}
      <div className="w-auto flex flex-row justify-around items-around md:justify-around max-w-[1500px] sm:pb-10 flex flex-col sm:flex-row gap-4 p-[30px]">
        <button
          onClick={() => navigate("/login")}
          className="w-[100px] h-[35px] rounded-full bg-[#3f63c5] 
          py-3 text-sm sm:text-base text-[white] 
          font-medium hover:opacity-90 transition mx-[20px] border-none cursor-pointer
          
          transition-all duration-300
          hover:bg-black/50 hover:-translate-y-[2px]
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)]
          "
        >
          Sign in
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="w-[100px] rounded-full bg-[#3f63c5] 
          py-3 text-sm sm:text-base text-[white]
           font-medium hover:opacity-90 transition mx-[20px] border-none cursor-pointer
           
           transition-all duration-300
          hover:bg-black/50 hover:-translate-y-[2px]
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)]
          "
        >
          Sign up
        </button>
      </div>
    </div>
    </CursorSparkle>
  );
}








