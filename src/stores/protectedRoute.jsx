import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access the profile ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
