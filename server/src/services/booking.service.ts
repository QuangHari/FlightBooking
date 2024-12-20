import prisma from '../utils/prisma';
import logger from '../utils/winston';

export interface CreateBookingInput {
  flightId: number;
  passengerId: number;
  paymentStatus: string;
  economySeats: number; 
  businessSeats: number;
}

export const createBooking = async (data: CreateBookingInput) => {
  const { flightId, passengerId, paymentStatus, economySeats, businessSeats } = data;
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

  // Tạo booking
  const booking = await prisma.booking.create({
    data: {
      FlightID: flightId,
      PassengerID: passengerId,
      PaymentStatus: paymentStatus,
      EconomySeats: economySeats, 
      BusinessSeats: businessSeats, 
      EconomyPrice: flight.EconomyPrice * economySeats,
      BusinessPrice: flight.BusinessPrice * businessSeats,
    },
  });

  // Cập nhật trạng thái ghế đã được đặt trực tiếp từ bảng flight (nếu cần thiết)
  // Trong trường hợp cần cập nhật trạng thái ghế, bạn có thể thực hiện cập nhật trực tiếp như:
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
      Flight: true,
      Passenger: true,
    }
  });

  if (!bookings || bookings.length === 0) {
    throw new Error('No bookings found for this user');
  }

  return bookings;
};