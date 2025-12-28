import { create } from "zustand";
import { persist } from "zustand/middleware";

// Determine initial isAuthenticated based on persisted storage
let initialIsAuthenticated = false;
try {
  const raw = localStorage.getItem("auth-storage");
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.state && parsed.state.token) {
      initialIsAuthenticated = true;
    }
  }
} catch (e) {
  // ignore parse errors, fallback to false
}

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: initialIsAuthenticated,
      loading: false,
      login: (userData, token) =>
        set({
          user: userData,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
