
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGoogle, FaApple } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-screen h-[100vh] bg-[#f5ccd4] flex flex-col text-center justify-center"
        initial= { {opacity: 0, y: 20 }}
        animate= {{ opacity: 1, y: 0 }}
        exit= {{opacity: 0, y: -20 }}
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
              bg-[#4b6cff]
              flex-col
              justify-center
              px-10
              text-[white]
            "
          >
            <h1 className="text-3xl xl:text-4xl font-semibold leading-tight mb-4 text-left ml-[20px]">
              Hello,<br />welcome!
            </h1>
            <p className="text-sm text-white/90 max-w-xs m-[20px]">
              A calm corner of the internet for real, unfiltered conversations.
            </p>
          </div>

          {/* Right Panel */}
          <div
            className="
              w-full
              min-[500px]:w-1/2
              px-6 py-8
              bg-[white]
            "
          >
            <h2 className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-[#4b6cff] mb-5 mt-[100px]">
              Welcome back
            </h2>

            <input
              placeholder="Email"
              className="w-[75%] mb-4 border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4b6cff]
              p-[12px] m-[10px] rounded-[10px]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-[75%] mb-4 rounded-[10px]
              border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4b6cff]
              p-[12px]"
            />

            {/* Remember + Forgot */}
            <div className="w-[80%] mt-[10px] mb-[20px] mx-auto flex items-center justify-between text-sm ">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#4b6cff] cursor-pointer" />
                <span>Remember me</span>
              </label>

              <span
                onClick={() => navigate("/forgot")}
                className="cursor-pointer text-[#4b6cff] hover:underline"
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
              <button className="h-[42px] w-[42px] text-[20px] border-none flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:-translate-y-[2px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] transition cursor-pointer">
                <FaFacebookF />
              </button>
              <button className="h-[42px] w-[42px] text-[20px] border-none flex items-center justify-center rounded-full bg-[#1da1f2] text-white hover:-translate-y-[2px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] transition cursor-pointer">
                <FaTwitter />
              </button>
              <button className="h-[42px] w-[42px] text-[20px] border-none flex items-center justify-center rounded-full bg-[#db4437] text-white hover:-translate-y-[2px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] transition cursor-pointer">
                <FaGoogle />
              </button>
              <button className="h-[42px] w-[42px] text-[20px] border-none flex items-center justify-center rounded-full bg-black text-white hover:-translate-y-[2px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] transition cursor-pointer">
                <FaApple />
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
