import apiClient from "../api/index";

export interface Passenger {
    PassengerID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PassportNumber: string | null;
    Password: string;
    PhoneNumber: string | null;
    DateOfBirth: string | null;
    Username: string;
}

export interface RegistrationResponse {
    passenger: Passenger;
    token: string;
}

export interface RegistrationRequest {
    email: string; 
    password: string;
    username: string;
}

export const register = async (credentials: RegistrationRequest): Promise<RegistrationResponse> => {
    try {
        const response = await apiClient.post<RegistrationResponse>("/passengers/register", credentials);
        return response.data;
    } catch (error: any) {
        throw new Error("An error occurred while trying to register");
    }
};
