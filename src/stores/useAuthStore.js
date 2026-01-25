// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // Determine initial isAuthenticated based on persisted storage
// let initialIsAuthenticated = false;
// try {
//   const raw = localStorage.getItem("auth-storage");
//   if (raw) {
//     const parsed = JSON.parse(raw);
//     if (parsed && parsed.state && parsed.state.token) {
//       initialIsAuthenticated = true;
//     }
//   }
// } catch (e) {
//   // ignore parse errors, fallback to false
// }

// const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isAuthenticated: initialIsAuthenticated,
//       loading: false,
//       login: (userData, token) =>
//         set({
//           user: userData,
//           token,
//           isAuthenticated: true,
//         }),
//       logout: () =>
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         }),
//       setLoading: (loading) => set({ loading }),

//       setError: (error) => set({ error }),

//       clearError: () => set({ error: null }),

//       // Check if user is authenticated
//       checkAuth: () => {
//         const { token } = get();
//         return !!token;
//       },

//       // Update user data
//       updateUser: (userData) => {
//         console.log("👤 UPDATE USER - Updating localStorage with:", userData);
//         set((state) => ({
//           user: { ...state.user, ...userData },
//         }));
//       },
//     }),
//     { name: "auth-storage" }
//   )
// );

// export default useAuthStore;

















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
  // ignore parse errors
}

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: initialIsAuthenticated,
      loading: false,
      error: null,

      /* ================= LOGIN ================= */
      login: (userData, token) =>
        set({
          user: userData,
          token,
          isAuthenticated: true,
        }),

      /* ================= LOGOUT ================= */
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      /* ================= CHECK AUTH ================= */
      checkAuth: () => {
        const { token } = get();
        return !!token;
      },

      /* ================= UPDATE USER ================= */
      updateUser: (userData) => {
        console.log("👤 UPDATE USER - Saving user data:", userData);

        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: "auth-storage",

      // 🔥🔥🔥 MOST IMPORTANT FIX 🔥🔥🔥
      // Only persist SMALL & SAFE DATA
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,

        // ❌ DO NOT STORE FULL USER (NO AVATAR, NO BIO, NO MOBILE, ETC.)
        user: state.user
          ? {
              _id: state.user._id,
              id: state.user.id,
              username: state.user.username,
              email: state.user.email,
            }
          : null,
      }),
    }
  )
);

export default useAuthStore;
