import apiClient from "../api/index";



export const fetchAllAirports = async (): Promise<any> => {
  try {
    const response = await apiClient.get<any>("/airports");
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while fetching airports");
  }
};