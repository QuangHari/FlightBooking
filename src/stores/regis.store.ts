import { defineStore } from "pinia";
import { register, RegistrationResponse, RegistrationRequest } from "../api/regis"; // Đường dẫn tới file register

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

export const useRegisStore = defineStore("regis", {
    state: (): AuthState => ({
        accessToken: null,
        passenger: null,
        isAuthenticated: false,
    }),

    actions: {
        async register(credentials: RegistrationRequest) {
            try {
                const response: RegistrationResponse = await register(credentials);

                // Lưu accessToken vào state
                this.accessToken = response.token;

                this.passenger = response.passenger;
                
                this.isAuthenticated = true;
                localStorage.setItem("passengerId", response.passenger.PassengerID.toString())

                localStorage.setItem("accessToken", response.token);
                localStorage.setItem("passengerId", response.passenger.PassengerID.toString())
                return response;
            } catch (error) {
                console.error("Registration failed:", error);
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
