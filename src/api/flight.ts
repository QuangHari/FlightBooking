import apiClient from "../api/index";



export const searchFlights = async (): Promise<any> => {
  try {
    const response = await apiClient.get<any>("/flights/search");
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while fetching airports");
  }
};