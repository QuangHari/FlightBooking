import express, { Request, Response } from 'express';
import { createBooking , getBookingById} from '../services/booking.service';
import logger from '../utils/winston';
const router = express.Router();


// Route tạo mới booking
router.post('/', async (req: Request, res: Response) : Promise<any> => {
  try {
    const { flightId, passengerId, paymentStatus, seatNumbers } = req.body;

    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return res.status(400).json({ message: 'Seat numbers must be provided' });
    }

    const booking = await createBooking({ flightId, passengerId, paymentStatus, seatNumbers });
    res.status(201).json(booking);
  } catch (error: any) {
    logger.error(`Error creating booking: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

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
  



export default router;
