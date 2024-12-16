import express, { Request, Response } from 'express';
import { createAirport, getAllAirports } from '../services/airport.service';
import logger from '../utils/winston';

const router = express.Router();

// API để tạo sân bay mới
router.post('/create', async (req: Request, res: Response): Promise<void> => {
  try {
    const { airportCode, airportName, location, facilities } = req.body;

    if (!airportCode || !airportName || !location) {
      res.status(400).json({ message: 'Airport code, name, and location are required' });
      return;
    }

    const airport = await createAirport({ airportCode, airportName, location, facilities });
    res.status(201).json({ airport });
  } catch (error: any) {
    logger.error(`Error creating airport: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// API để lấy danh sách tất cả sân bay
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const airports = await getAllAirports();
    res.status(200).json({ airports });
  } catch (error: any) {
    logger.error(`Error fetching airports: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

export default router;
