import express, { Request, Response } from 'express';
import { createBooking, getBookingById, getBookingsByUserId } from '../services/booking.service';
import logger from '../utils/winston';

const router = express.Router();

// Route tạo mới booking
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
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
    } = req.body;

    logger.info(`Creating booking for PassengerID: ${passengerId}`);

    // Kiểm tra số ghế phải hợp lệ
    if (economySeats < 0 || businessSeats < 0) {
      return res
        .status(400)
        .json({ message: 'Number of economy and business seats must be provided and greater than 0' });
    }

    // Gọi hàm tạo booking từ service
    const booking = await createBooking({
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
    });

    res.status(201).json(booking);
  } catch (error: any) {
    logger.error(`Error creating booking: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Route lấy thông tin booking theo ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    logger.info(`Fetching booking with ID: ${id}`);

    // Gọi hàm lấy thông tin booking từ service
    const booking = await getBookingById(Number(id));

    res.status(200).json(booking);
  } catch (error: any) {
    logger.error(`Error fetching booking: ${error.message}`);
    res.status(404).json({ message: error.message });
  }
});

// Route lấy danh sách booking theo userId
router.post('/user', async (req: Request, res: Response) => {
  const { userId } = req.body;

  logger.info(`Fetching bookings for userId: ${userId}`);

  try {
    // Gọi hàm lấy danh sách booking từ service
    const bookings = await getBookingsByUserId(Number(userId));

    res.status(200).json(bookings);
  } catch (error: any) {
    logger.error(`Error fetching bookings for user ${userId}: ${error.message}`);
    res.status(404).json({ message: error.message });
  }
});

export default router;
