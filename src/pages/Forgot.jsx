import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import AuthButton from "../components/Auth/AuthButton";

export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [loading, setLoading] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setStep(2);
        toast.success("OTP sent to your email");
    }, 1000);
  };

  const handleResetPassword = (e) => {
      e.preventDefault();
      if (!otp || !newPassword || !confirmPassword) {
          toast.error("Please fill in all fields");
          return;
      }
      if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
      }
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
          setLoading(false);
          toast.success("Password reset successful!");
          navigate("/login");
      }, 1000);
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Don't worry, it happens to the best of us."
      linkText="Remembered it?"
      linkTo="/login"
      linkActionText="Sign in"
    >
      <div className="w-full max-w-md mx-auto">
        <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-500 hover:text-[#4b6cff] flex items-center gap-1 transition-colors"
        >
            ‹ Back
        </button>

        <h2 className="text-2xl font-bold text-[#1C4D8D] mb-2 text-center md:text-left">
          Forgot Password?
        </h2>
        <p className="text-gray-500 mb-8 text-center md:text-left">
            {step === 1 ? "Enter your email to receive a verification code." : "Enter the code and set a new password."}
        </p>

        {step === 1 ? (
             <form onSubmit={handleSendOTP} className="space-y-4">
                <AuthInput
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <AuthButton type="submit" loading={loading}>
                    Send OTP
                </AuthButton>
             </form>
        ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
                 <AuthInput
                    name="otp"
                    placeholder="Enter OTP Code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                 <AuthInput
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                 <AuthInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <AuthButton type="submit" loading={loading}>
                    Reset Password
                </AuthButton>
            </form>
        )}
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
