import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGoogle, FaApple } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-screen h-[100vh] bg-[#BDE8F5] flex flex-col text-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="h-[70%] flex flex-col text-center justify-evenly">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="w-[80px] h-[35px] rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur ml-[10px]
          transition-all duration-300 cursor-pointer
          hover:bg-black/50 hover:-translate-y-[2px]
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] border-none"
        >
          ‹ Back
        </button>

        {/* Main Card */}
        <div
          className="
            h-[500px]
            w-[calc(100vw-20px)]
            max-w-[800px]
            bg-white
            rounded-[30px]
            shadow-xl
            overflow-hidden
            mx-auto
            flex flex-col
            min-[500px]:flex-row
          "
        >
          
          {/* Left Panel (Desktop only) */}
          <div
            className="
              hidden
              min-[500px]:flex
              min-[500px]:w-1/2
              h-full
              bg-[#1C4D8D]
              flex-col
              justify-center
              px-10
              text-[white]
            "
          >
            <div className="flex flex-col items-center">
              <h1 className="text-white text-3xl xl:text-4xl font-semibold leading-tight mb-4 text-left ml-[20px]">
                Welcome Back !{" "}
              </h1>
              <p className="text-white">Let's Vibe together </p>
            </div>
          </div>

          {/* Right Panel */}
          <div
            className="
              w-full
              min-[500px]:w-1/2
              px-6 py-4
              bg-[white]
            "
          >
            <h2 className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-[#1C4D8D] mb-5 mt-[30px]">
              Welcome back
            </h2>

            <input
              placeholder="Email"
              className="w-[75%] mb-4 border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4988C4]
              p-[12px] m-[10px] rounded-[10px]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-[75%] mb-4 rounded-[10px]
              border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4988C4]
              p-[12px]"
            />

            {/* Remember + Forgot */}
            <div className="w-[80%] mt-[10px] mb-[20px] mx-auto flex items-center justify-between text-sm ">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-[#4988C4] cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <span
                onClick={() => navigate("/forgot")}
                className="text-[#4988C4] cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Sign In */}
            <button
              className="w-[80%] p-[10px] text-[white] mb-[20px] rounded-full
              bg-[#3f63c5] py-3 text-sm sm:text-base cursor-pointer
              font-medium hover:opacity-90 transition border-none"
            >
              Sign in
            </button>

            {/* Social Login */}
            <div className="w-[75%] my-[20px] flex justify-around mx-auto">
           
                   <button
              type="button"
              className="w-[100vh] mx-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full hover:bg-gray-50 transition"
            >
              <FaGoogle />
              <span> Sign up with Google</span>
            </button>
          
            </div>

            {/* Signup Link */}
            <p className="mt-[25px] mb-[50px] text-center text-[18px]">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-[#4b6cff] font-medium hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
