import apiClient from "../api/index";

export interface CreatePlaneInput {
  name: string;
  capacity: number;
  details?: string;
}

export const createPlane = async (planeData: CreatePlaneInput): Promise<any> => {
  try {
    const response = await apiClient.post<any>("/planes/create", planeData);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while trying to create the plane");
  }
};

export const fetchAllPlanes = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get<any[]>("/planes");
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while fetching planes");
  }
};
