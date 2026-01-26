// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import useAuthStore from "../stores/useAuthStore";
// import "react-toastify/dist/ReactToastify.css";

// import AuthLayout from "../components/Auth/AuthLayout";
// import AuthInput from "../components/Auth/AuthInput";
// import AuthButton from "../components/Auth/AuthButton";
// import SocialLogin from "../components/Auth/SocialLogin";

// export default function Login() {
//   const navigate = useNavigate();
//   const { isAuthenticated, login, setLoading, loading } = useAuthStore();
//   const [formData, setFormData] = React.useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [error, setError] = React.useState("");

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

//     if (!formData.email || !formData.password) {
//       const errorMsg = "Please fill in all fields";
//       setError(errorMsg);
//       toast.error(errorMsg);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       const { user, token } = data;
//       login(user, token);
//       toast.success(`Welcome back, ${user.username || user.name}!`);
//       navigate("/profile");
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || "Failed to sign in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout
//       title="Welcome Back!"
//       subtitle="Let's Vibe together"
//       linkText="Don't have an account?"
//       linkTo="/signup"
//       linkActionText="Sign up"
//     >
//       <div className="w-full max-w-md mx-auto">
//         <h2 className="text-2xl font-bold text-[#1C4D8D] mb-6 text-center md:text-left">
//           Sign In
//         </h2>

//         {error && (
//           <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
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

//           <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <input
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="accent-[#4b6cff] w-4 h-4 rounded border-gray-300 focus:ring-[#4b6cff]"
//               />
//               <span>Remember me</span>
//             </label>

//             <span
//               onClick={() => navigate("/forgot")}
//               className="text-[#4b6cff] font-medium cursor-pointer hover:underline"
//             >
//               Forgot password?
//             </span>
//           </div>

//           <AuthButton type="submit" loading={loading}>
//             Sign In
//           </AuthButton>
//         </form>

//         <SocialLogin
//           onGoogleClick={() => toast.info("Google login not implemented yet")}
//           onFacebookClick={() => toast.info("Facebook login not implemented yet")}
//         />

//         <div className="mt-8 text-center md:hidden">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               className="text-[#4b6cff] font-bold cursor-pointer hover:underline"
//             >
//               Sign up
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






import React from "react";
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

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login, setLoading, loading } = useAuthStore();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = React.useState("");

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

  // ---------------- NORMAL EMAIL LOGIN (UNCHANGED) ----------------
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
        headers: { "Content-Type": "application/json" },
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

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // OPTIONAL: send to backend if you want to store user
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
      toast.error(error.message || "Google login failed");
    }
  };

  // ---------------- FACEBOOK LOGIN ----------------
  const handleFacebookLogin = async () => {
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
      toast.error(error.message || "Facebook login failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Let's Vibe together"
      linkText="Don't have an account?"
      linkTo="/signup"
      linkActionText="Sign up"
    >
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-[#1C4D8D] mb-6 text-center md:text-left">
          Sign In
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="accent-[#4b6cff] w-4 h-4 rounded border-gray-300 focus:ring-[#4b6cff]"
              />
              <span>Remember me</span>
            </label>

            <span
              onClick={() => navigate("/forgot")}
              className="text-[#4b6cff] font-medium cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <AuthButton type="submit" loading={loading}>
            Sign In
          </AuthButton>
        </form>

        {/* 🔥 SOCIAL LOGIN NOW WORKING 🔥 */}
        <SocialLogin
          onGoogleClick={handleGoogleLogin}
          onFacebookClick={handleFacebookLogin}
        />

        <div className="mt-8 text-center md:hidden">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#4b6cff] font-bold cursor-pointer hover:underline"
            >
              Sign up
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
