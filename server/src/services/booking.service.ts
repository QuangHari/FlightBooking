import prisma from '../utils/prisma';

export interface CreateBookingInput {
  flightId: number;
  passengerId: number;
  paymentStatus: string;
  seatNumbers: string[]; 
}

export const createBooking = async (data: CreateBookingInput) => {
  const { flightId, passengerId, paymentStatus, seatNumbers } = data;

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

  // Kiểm tra ghế có hợp lệ không
  const availableSeats = await prisma.seat.findMany({
    where: { FlightID: flightId, SeatNumber: { in: seatNumbers }, IsBooked: false },
  });

  if (availableSeats.length !== seatNumbers.length) {
    throw new Error('One or more selected seats are already booked or invalid');
  }

  // Tạo booking
  const booking = await prisma.booking.create({
    data: {
      FlightID: flightId,
      PassengerID: passengerId,
      PaymentStatus: paymentStatus,
      EconomyPrice: 0, 
      BusinessPrice: 0,
      EconomySeats: 0, 
      BusinessSeats: 0, 
      Seats: {
        connect: availableSeats.map((seat) => ({ SeatID: seat.SeatID })),
      },
    },
  });

  // Cập nhật trạng thái ghế đã được đặt
  await prisma.seat.updateMany({
    where: { SeatID: { in: availableSeats.map((seat) => seat.SeatID) } },
    data: { IsBooked: true },
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
  

