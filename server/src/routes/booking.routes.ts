import express, { Request, Response } from 'express';
import { createBooking, getBookingById, getBookingsByUserId } from '../services/booking.service';
import logger from '../utils/winston';

const router = express.Router();

// Route tạo mới booking
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { flightId, passengerId, paymentStatus, economySeats, businessSeats } = req.body;
    logger.info("economySeats and businessSeats", passengerId)
    if (economySeats < 0 || businessSeats < 0) {
      return res.status(400).json({ message: 'Number of economy and business seats must be provided and greater than 0' });
    }

    const booking = await createBooking({ flightId, passengerId, paymentStatus, economySeats, businessSeats });
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
    try {
      const bookings = await getBookingsByUserId(Number(userId));
  
      res.status(200).json(bookings);
    } catch (error: any) {
      logger.error(`Error fetching bookings for user ${userId}: ${error.message}`);
      res.status(404).json({ message: error.message });
    }
});

export default router;
