import prisma from '../utils/prisma';
import logger from '../utils/winston';

export interface CreateBookingInput {
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
  dateOfBirth: Date;
  national: string;
  passportNumber: string;
  phoneNumber: string;
  address: string;
}

export const createBooking = async (data: CreateBookingInput) => {
  const {
    flightId,
    passengerId,
    paymentStatus,
    economySeats,
    businessSeats,
    customerFirstName,
    customerLastName,
    customerId,
    gender,
    age,
    dateOfBirth,
    national,
    passportNumber,
    phoneNumber,
    address,
  } = data;

  logger.info(`Creating booking for flightId: ${flightId}, passengerId: ${passengerId}`);

  // Kiểm tra flight tồn tại
  const flight = await prisma.flight.findUnique({ where: { FlightID: flightId } });
  if (!flight) {
    throw new Error('Flight not found');
  }

  // Kiểm tra passenger tồn tại
  const passenger = await prisma.passenger.findUnique({ where: { PassengerID: passengerId } });
  if (!passenger) {
    throw new Error('Passenger not found');
  }

  // Trừ số lượng ghế từ bảng flight
  if (flight.EconomySeats < economySeats || flight.BusinessSeats < businessSeats) {
    throw new Error('One or more selected seats are already booked or insufficient availability');
  }

  // Tạo booking với các trường mới
  const booking = await prisma.booking.create({
    data: {
      FlightID: flightId,
      PassengerID: passengerId,
      PaymentStatus: paymentStatus,
      EconomySeats: economySeats, 
      BusinessSeats: businessSeats, 
      EconomyPrice: flight.EconomyPrice * economySeats,
      BusinessPrice: flight.BusinessPrice * businessSeats,
      CustomerFirstName: customerFirstName,
      CustomerLastName: customerLastName,
      CustomerID: customerId,
      Gender: gender,
      Age: age,
      DateOfBirth: dateOfBirth,
      National: national,
      PassportNumber: passportNumber,
      PhoneNumber: phoneNumber,
      Address: address,
    },
  });

  // Cập nhật trạng thái ghế đã được đặt
  await prisma.flight.update({
    where: { FlightID: flightId },
    data: {
      EconomySeats: flight.EconomySeats - economySeats,
      BusinessSeats: flight.BusinessSeats - businessSeats,
    },
  });

  return booking;
};

export const getBookingById = async (bookingId: number) => {
  const booking = await prisma.booking.findUnique({ 
    where: { BookingID: bookingId },
    include: {
      Flight: true,
      Passenger: true,
      Seats: true,
    }
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;
};

export const getBookingsByUserId = async (userId: number) => {
  const bookings = await prisma.booking.findMany({ 
    where: { PassengerID: userId },
    include: {
      Flight: {
        include: {
          OriginAirport: true,      
          DestinationAirport: true,  
          Aircraft: true,            
        }
      },
      Passenger: true,
    }
  });

  if (!bookings || bookings.length === 0) {
    throw new Error('No bookings found for this user');
  }

  return bookings;
};

export const cancelBooking = async (bookingId: number, userId: number) => {
  // Kiểm tra booking có tồn tại không
  const booking = await prisma.booking.findUnique({
    where: { BookingID: bookingId },
    include: {
      Flight: true,  // Cần lấy thông tin về chuyến bay để cập nhật lại ghế
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  // Kiểm tra booking này có thuộc về userId không
  if (booking.PassengerID !== userId) {
    throw new Error('You are not authorized to cancel this booking');
  }

  // Trả lại ghế cho chuyến bay
  await prisma.flight.update({
    where: { FlightID: booking.FlightID },
    data: {
      EconomySeats: booking.Flight.EconomySeats + booking.EconomySeats,
      BusinessSeats: booking.Flight.BusinessSeats + booking.BusinessSeats,
    },
  });

  // Cập nhật trạng thái booking thành "Cancelled" hoặc xóa booking nếu cần
  const cancelledBooking = await prisma.booking.update({
    where: { BookingID: bookingId },
    data: {
      PaymentStatus: 'Cancelled', // Có thể đổi trạng thái nếu cần
    },
  });

  return cancelledBooking;
};