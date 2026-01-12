import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: (userData, token) => {
        console.log("🔐 LOGIN - Setting localStorage with:", {
          user: userData,
          token,
        });
        set({
          user: userData,
          token,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        console.log("🚪 LOGOUT - Clearing localStorage");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      // Check if user is authenticated
      checkAuth: () => {
        const { token } = get();
        return !!token;
      },

      // Update user data
      updateUser: (userData) => {
        console.log("👤 UPDATE USER - Updating localStorage with:", userData);
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: "auth-storage",
      // Only persist certain fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
