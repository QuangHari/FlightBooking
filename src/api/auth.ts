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

export interface LoginResponse {
  passenger: Passenger;
  token: string;
}

export interface LoginRequest {
  email: string; 
  password: string;
}


export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/passengers/login", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while trying to log in");
  }
};
