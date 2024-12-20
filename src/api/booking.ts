import apiClient from "../api/index";

export const createBooking = async (bookingData: {
  flightId: number;
  passengerId: number;
  paymentStatus: string;
  economySeats: number;
  businessSeats: number;
  customerFirstName: string;
  customerLastName: string;
  customerId: string;
  gender: string;
  age: number;
  dateOfBirth: string; // Định dạng: YYYY-MM-DD
  national: string;
  passportNumber: string;
  phoneNumber: string;
  address: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post<any>("/bookings", bookingData);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred while creating booking");
  }
};


export const getAllBookingByUserId = async (userId: number): Promise<any> => {
    try {
      const response = await apiClient.post<any>("/bookings/user", { userId });
      return response.data;
    } catch (error: any) {
      throw new Error(`An error occurred while fetching bookings for user ${userId}`);
    }
  };
