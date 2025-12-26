import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!formData.agreeToTerms) {
      setError("Please agree to the processing of personal data");
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
      // Signup successful - navigate to login or home
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#BDE8F5] flex flex-col text-center justify-center">
      <div className="h-[70%] flex flex-col text-center justify-evenly">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="w-20 h-8.75 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur ml-2.5
             transition-all duration-300 cursor-pointer
             hover:bg-black/50 hover:-translate-y-[2px]
             hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] border-none"
        >
          ‹ Back
        </button>

        {/* Main Card */}
        <div
          className="
            h-full w-[calc(100vw-20px)] max-w-200 bg-white rounded-[30px] shadow-xl overflow-hidden
            mx-auto
            flex flex-col
            min-[500px]:flex-row
             "
        >
          {/* Left Panel (Desktop only) */}
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
            <h2 className="text-center lg:text-left text-xl sm:text-2xl font-semibold text-[#1C4D8D] mb-5 mt-[20px]  ">
              Get Started
            </h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-[75%] mb-4 border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4b6cff] p-[12px] mt-[10px] rounded-[10px]"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-[75%] mb-4 border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4b6cff] p-[12px] m-[10px] rounded-[10px]"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-[75%] mb-4 rounded-[10px] border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-[#4b6cff] p-[12px]"
              required
            />

            {/* Remember + Forgot */}
            <div className="w-[80%] mt-[10px] mb-[20px] mx-auto mb-5 flex flex-row flex-row items-center justify-between text-sm">
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

            {/* Sign Up */}
            <button
              type="submit"
              disabled={loading}
              className="w-[80%] p-[10px] text-[white] mb-[10px] rounded-full bg-[#3f63c5] py-3 text-sm sm:text-base text-white font-medium hover:opacity-90 transition border-none cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>

            {/* Divider for social login */}
            <div className="flex items-center w-[80%] mx-auto my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              className="w-[80%] mx-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full hover:bg-gray-50 transition"
            >
              <FaGoogle />
              <span>Sign up with Google</span>
            </button>

            {/* Signup Link */}
            <p className="mt-[25px] mb-[50px] text-center text-stone-900 text-[18px]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-[#4b6cff] font-medium hover:underline"
              >
                Sign in
              </span>
            </p>
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
            px-10
            text-[white]
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
          </div>
        </div>
      </div>
    </div>
  );
}
