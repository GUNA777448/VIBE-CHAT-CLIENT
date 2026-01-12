import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { authAPI } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, setLoading, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // API Base URL
  const API_BASE_URL = "http://localhost:5000";

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const data = await authAPI.login(formData);

      // Store user data and token in auth store
      login(data.user, data.token);

      // Show success message (you can replace with toast notification)
      alert("Login successful!");

      // Navigate to home or dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: error.message || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

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
              items-center
              px-10
              text-white
            "
          >
            <div className="max-w-sm text-center">
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight mb-6">
                Welcome Back!
              </h1>
              <p className="text-base text-white/90 mb-12 leading-relaxed">
                Let's Vibe together
              </p>
              <div className="w-full">
                <p className="text-base mb-3">Don't have an account?</p>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-8 py-3 bg-white text-[#1C4D8D] font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg mt-4 w-[80%]"
                >
                  Sign up
                </button>
              </div>
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
            <div className="flex justify-center items-center p-2 rounded-2xl mt-12 ">
              <h1 className="border-2 border-black text-center font-bold text-white bg-[#4988C4] p-2 text-2xl ">
                VIBE{" "}
              </h1>
              <h1 className="text-black font-bold text-2xl m-2 border-2 p-2">
                CHAT
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-[75%] mb-2 border text-sm sm:text-base
                focus:outline-none p-[12px] m-[10px] rounded-[10px]
                ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4988C4]"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs w-[75%] mb-2">
                  {errors.email}
                </span>
              )}

              <div className="relative w-[75%]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full mb-2 rounded-[10px]
                  border text-sm sm:text-base
                  focus:outline-none p-[12px]
                  ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#4988C4]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs w-[75%] mb-2">
                  {errors.password}
                </span>
              )}

              {/* Remember + Forgot */}
              <div className="w-[80%] mt-[10px] mb-[20px] mx-auto flex items-center justify-between text-sm">
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

              {/* Error message */}
              {errors.submit && (
                <div className="w-[80%] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-[80%] p-[10px] text-white mb-[20px] rounded-full
                py-3 text-sm sm:text-base cursor-pointer font-medium transition border-none
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3f63c5] hover:opacity-90"
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <div className="flex items-center w-[80%] mx-auto my-1">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="w-[75%] my-[15px] flex justify-around mx-auto">
              <button
                type="button"
                onClick={() => {
                  // TODO: Implement Google OAuth
                  alert("Google Sign-in not implemented yet");
                }}
                className="w-[100vh] mx-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full hover:bg-gray-50 transition"
              >
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Signup Link - Removed since it's now in the left panel */}

            {/* Mobile-only Signup Link */}
            <div className="min-[500px]:hidden mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#4988C4] font-semibold cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
