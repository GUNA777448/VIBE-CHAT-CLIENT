// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import useAuthStore from "../stores/useAuthStore";
// import "react-toastify/dist/ReactToastify.css";

// import AuthLayout from "../components/Auth/AuthLayout";
// import AuthInput from "../components/Auth/AuthInput";
// import AuthButton from "../components/Auth/AuthButton";
// import SocialLogin from "../components/Auth/SocialLogin";

// export default function Signup() {
//   const navigate = useNavigate();
//   const { login, loading, setLoading, isAuthenticated } = useAuthStore();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "", // Added confirm password field usually expected in signups
//     agreeToTerms: false,
//   });
//   const [error, setError] = useState("");

//   React.useEffect(() => {
//     if (isAuthenticated) navigate("/profile");
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.fullName || !formData.email || !formData.password) {
//       const errorMsg = "Please fill in all fields";
//       setError(errorMsg);
//       toast.error(errorMsg);
//       return;
//     }

//     if (formData.password.length < 6) {
//       const errorMsg = "Password must be at least 6 characters long";
//       setError(errorMsg);
//       toast.error(errorMsg);
//       return;
//     }

//     if (!formData.agreeToTerms) {
//       const errorMsg = "Please agree to the processing of personal data";
//       setError(errorMsg);
//       toast.error(errorMsg);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       const { user, token } = data;
//       login(user, token);
//       toast.success("Signup successful! Welcome to Vibe Chat!");
//       navigate("/profile");
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout
//       title="Hello, welcome!"
//       subtitle="A calm corner of the internet for real, unfiltered conversations."
//       linkText="Already have an account?"
//       linkTo="/login"
//       linkActionText="Sign in"
//     >
//       <div className="w-full max-w-md mx-auto">
//         <h2 className="text-2xl font-bold text-[#1C4D8D] mb-6 text-center md:text-left">
//           Create Account
//         </h2>

//         {error && (
//           <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <AuthInput
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//           <AuthInput
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <AuthInput
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <div className="flex items-center gap-2 text-sm text-gray-600 my-4">
//              <input
//                type="checkbox"
//                name="agreeToTerms"
//                checked={formData.agreeToTerms}
//                onChange={handleChange}
//                className="accent-[#4b6cff] w-4 h-4 rounded border-gray-300 focus:ring-[#4b6cff] shrink-0"
//                id="terms"
//              />
//              <label htmlFor="terms" className="cursor-pointer select-none">
//                I agree to the <span className="text-[#4b6cff] hover:underline">Terms of Service</span> and <span className="text-[#4b6cff] hover:underline">Privacy Policy</span>
//              </label>
//           </div>

//           <AuthButton type="submit" loading={loading}>
//             Sign Up
//           </AuthButton>
//         </form>

//         <SocialLogin
//           onGoogleClick={() => toast.info("Google signup not implemented yet")}
//           onFacebookClick={() => toast.info("Facebook signup not implemented yet")}
//         />

//         <div className="mt-8 text-center md:hidden">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-[#4b6cff] font-bold cursor-pointer hover:underline"
//             >
//               Sign in
//             </span>
//           </p>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </AuthLayout>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import AuthButton from "../components/Auth/AuthButton";
import SocialLogin from "../components/Auth/SocialLogin";

export default function Signup() {
  const navigate = useNavigate();
  const { login, loading, setLoading, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

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

  // ---------------- NORMAL SIGNUP (UNCHANGED) ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
        headers: { "Content-Type": "application/json" },
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

      const { user, token } = data;
      login(user, token);
      toast.success("Signup successful! Welcome to Vibe Chat!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GOOGLE SIGNUP ----------------
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      login(
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        "firebase-google-token"
      );

      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google signup failed");
    }
  };

  // ---------------- FACEBOOK SIGNUP ----------------
  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      login(
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        "firebase-facebook-token"
      );

      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Facebook signup failed");
    }
  };

  return (
    <AuthLayout
      title="Hello, welcome!"
      subtitle="A calm corner of the internet for real, unfiltered conversations."
      linkText="Already have an account?"
      linkTo="/login"
      linkActionText="Sign in"
    >
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-[#1C4D8D] mb-6 text-center md:text-left">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <AuthInput
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <AuthInput
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-2 text-sm text-gray-600 my-4">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="accent-[#4b6cff] w-4 h-4 rounded border-gray-300 focus:ring-[#4b6cff] shrink-0"
              id="terms"
            />
            <label htmlFor="terms" className="cursor-pointer select-none">
              I agree to the{" "}
              <span className="text-[#4b6cff] hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#4b6cff] hover:underline">Privacy Policy</span>
            </label>
          </div>

          <AuthButton type="submit" loading={loading}>
            Sign Up
          </AuthButton>
        </form>

        {/* 🔥 SOCIAL SIGNUP NOW WORKING 🔥 */}
        <SocialLogin
          onGoogleClick={handleGoogleSignup}
          onFacebookClick={handleFacebookSignup}
        />

        <div className="mt-8 text-center md:hidden">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#4b6cff] font-bold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
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
    </AuthLayout>
  );
}
