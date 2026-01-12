import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login, setLoading, loading } = useAuthStore();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = React.useState("");

  // Redirect to profile when already authenticated
  React.useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      const errorMsg = "Please fill in all fields";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { user, token } = data;
      login(user, token);
      toast.success(`Welcome back, ${user.username || user.name}!`);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to sign in. Please try again.");
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
            <div className="flex flex-col items-center">
              <h1 className="text-white text-3xl xl:text-4xl font-semibold leading-tight mb-4 text-center">
                Welcome Back !{" "}
              </h1>
              <p className="text-white">Let's Vibe together </p>

              {/* Signup Link */}
              <p className="mt-[25px] text-center text-[18px] text-white">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer text-[#BDE8F5] font-medium hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              min-[500px]:w-1/2
              px-6 py-4
              bg-[white]
            "
          >
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <h2 className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-[#1C4D8D] mb-5 mt-[30px]">
              Welcome back
            </h2>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[75%] mb-4 border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4988C4]
              p-[12px] m-[10px] rounded-[10px]"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-[75%] mb-4 rounded-[10px]
              border border-gray-300 text-sm sm:text-base
              focus:outline-none focus:border-[#4988C4]
              p-[12px]"
              required
            />

            {/* Remember + Forgot */}
            <div className="w-[80%] mt-[10px] mb-[20px] mx-auto flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
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

            {/* Divider */}
            <div className="flex items-center w-[80%] mx-auto my-1">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="w-[75%] my-[20px] flex justify-around mx-auto">
              <button
                type="button"
                className="w-[80%] mx-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full hover:bg-gray-50 transition"
              >
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </motion.div>
  );
}
