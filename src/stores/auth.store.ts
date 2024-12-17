import { defineStore } from "pinia";
import { login, LoginRequest, LoginResponse } from "../api/auth"; // Đường dẫn tới file login

interface AuthState {
  accessToken: string | null;
  passenger: {
    PassengerID: number | null;
    FirstName: string;
    LastName: string;
    Email: string;
    PassportNumber: string | null;
    PhoneNumber: string | null;
    DateOfBirth: string | null;
    Username: string;
  } | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    passenger: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials: LoginRequest) {
      try {
        const response: LoginResponse = await login(credentials);

        // Lưu accessToken vào state
        this.accessToken = response.token;

        this.passenger = response.passenger;

        this.isAuthenticated = true;

        localStorage.setItem("accessToken", response.token);

        return response;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    logout() {
      // Xóa thông tin trong state
      this.accessToken = null;
      this.passenger = null;
      this.isAuthenticated = false;

      // Xóa token khỏi localStorage
      localStorage.removeItem("accessToken");
    },

    loadStoredToken() {
      // Lấy token từ localStorage
      const token = localStorage.getItem("accessToken");
      if (token) {
        this.accessToken = token;
        this.isAuthenticated = true;
      }
    },
  },

  getters: {
    isLoggedIn(state): boolean {
      return state.isAuthenticated;
    },

    getPassengerInfo(state) {
      return state.passenger;
    },
  },
});
