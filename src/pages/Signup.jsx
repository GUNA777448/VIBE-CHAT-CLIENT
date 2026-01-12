import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Signup() {
  const navigate = useNavigate();
  const { login, loading, setLoading, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  // Use Zustand store instead of local state
  const { login, setLoading, loading, isAuthenticated } = useAuthStore();

  // Auto-redirect if already authenticated
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

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      const errorMsg = "Please fill in all fields";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!formData.agreeToTerms) {
      const errorMsg = "Please agree to the processing of personal data";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Backend returns user + token on successful signup (update your backend)
      const { user, token } = data;
      login(user, token); // Updates global state + persists
      toast.success("Signup successful! Welcome to Vibe Chat!");
      // Navigate to profile (user is authenticated)
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#BDE8F5] flex flex-col text-center justify-center">
      <div className="h-[70%] flex flex-col text-center justify-evenly">
        {/* Main Card */}
        <div
          className="
          h-full w-[calc(100vw-20px)] max-w-200 bg-white rounded-[30px] shadow-xl overflow-hidden
          mx-auto
          flex flex-col
          min-[500px]:flex-row
           "
        >
          {/* Left Panel (Form) */}
          <form
            onSubmit={handleSubmit}
            className="
            w-full
            h-full
            min-[500px]:w-1/2
            px-6 
            bg-[white]
            "
          >
            <h2 className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-[#1C4D8D] mb-5 mt-[20px]">
              Get Started
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-[75%] mb-2 border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4988C4] p-[12px] mt-[10px] rounded-[10px]"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-[75%] mb-2 border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4b6cff] p-[12px] m-[10px] rounded-[10px]"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-[75%] mb-2 rounded-[10px] border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4b6cff] p-[12px]"
              required
            />

            {/* Terms Checkbox */}
            <div className="w-[80%] mt-[10px] mb-5 mx-auto flex flex-row items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="accent-[#4b6cff] cursor-pointer"
                />
                <span>I agree to the processing of Personal data</span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[80%] p-[10px] text-white mb-[10px] rounded-full bg-[#3f63c5] py-3 text-sm sm:text-base font-medium hover:opacity-90 transition border-none cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>

            {/* Divider */}
            <div className="flex items-center w-[80%] mx-auto my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-[80%] mx-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full hover:bg-gray-50 transition mb-6"
              onClick={() => {
                /* Google OAuth handler */
              }}
            >
              <FaGoogle />
              <span>Sign up with Google</span>
            </button>
          </form>

          {/* Right Panel */}
          <div
            className="
            hidden
            min-[500px]:flex
            min-[500px]:w-1/2
            h-full
            bg-[#4b6cff]
            flex-col
            justify-center
            items-center
            px-10
            text-white
            "
          >
            <h1 className="text-3xl xl:text-4xl font-semibold leading-tight mb-4 text-left ml-[20px]">
              Hello,
              <br />
              welcome!
            </h1>
            <p className="text-sm text-white/90 max-w-xs m-[20px]">
              A calm corner of the internet for real, unfiltered conversations.
            </p>

            {/* Login Link */}
            <p className="mt-[25px] text-center text-[18px] text-white m-[20px]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-[#BDE8F5]  font-medium hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
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
    </div>
  );
}
