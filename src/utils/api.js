// API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// API utility class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for refresh tokens
      ...options,
    };

    // Add authorization token if available
    const token = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage"))?.state?.token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: "GET",
      headers,
    });
  }

  // POST request
  async post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  // PUT request
  async put(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }

  // DELETE request
  async delete(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      headers,
    });
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

// Auth API functions
export const authAPI = {
  login: (credentials) => apiClient.post("/api/auth/signin", credentials),
  register: (userData) => apiClient.post("/api/auth/signup", userData),
  getProfile: () => apiClient.get("/api/auth/profile"),
  updateProfile: (profileData) =>
    apiClient.put("/api/auth/profile", profileData),
  refreshToken: () => apiClient.post("/api/auth/refresh"),
  logout: () => apiClient.post("/api/auth/logout"),
};

export default apiClient;
