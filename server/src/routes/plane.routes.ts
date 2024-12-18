import express, { Request, Response } from 'express';
import { createPlane, getAllPlanes } from '../services/plane.service';
import logger from '../utils/winston';

const router = express.Router();

// API để tạo máy bay mới
router.post('/create', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, capacity, details } = req.body;

    if (!name  || !capacity) {
      res.status(400).json({ message: 'Plane name, images, and capacity are required' });
      return;
    }

    const plane = await createPlane({ name, capacity, details });
    res.status(201).json({ plane });
  } catch (error: any) {
    logger.error(`Error creating plane: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// API để lấy danh sách tất cả máy bay
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const planes = await getAllPlanes();
    res.status(200).json({ planes });
  } catch (error: any) {
    logger.error(`Error fetching planes: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

export default router;
