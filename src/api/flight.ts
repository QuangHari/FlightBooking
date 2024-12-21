import apiClient from "../api/index";

export interface CreateFlightInput {
  flightNumber: string,
  departureDateTime: string,
  arrivalDateTime: string,
  originAirportCode: string,
  destinationAirportCode: string,
  availableSeats: number,
  aircraftID: number,
  businessPrice: number,
  businessSeats: number,
  economyPrice:   number,
  economySeats: number
}
export const searchFlights = async (from: string, to: string, departureDate: string): Promise<any> => {
  try {
    const response = await apiClient.post<any>("/flights/search", {
      origin: from,
      destination: to,
      startDate: departureDate,
    });
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while searching for flights");
  }
};


export const getAllFlight = async (): Promise<any> => {
  try {
    const response = await apiClient.get<any>("/flights");
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while fetching flights");
  }
}

export const createFlight = async (flight: CreateFlightInput): Promise<any> => {
  try {
    const response = await apiClient.post<any>("/flights", flight);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while creating flight");
  }
}

export interface UpdateFlightScheduleInput {
  flightId: number;
  newDepartureDateTime: string;
  newArrivalDateTime: string;
}

export const updateFlightSchedule = async (data: UpdateFlightScheduleInput): Promise<any> => {
  try {
    const response = await apiClient.put<any>("/flights/update-schedule", data);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while updating flight schedule");
  }
}
export const getFlightByFlightNumber = async (flightNumber: string): Promise<any> => {
  try {
    const response = await apiClient.get<any>(`/flights/number/${flightNumber}`);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while fetching flight by flight number");
  }
}
