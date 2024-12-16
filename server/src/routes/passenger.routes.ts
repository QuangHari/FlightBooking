import express, { Request, Response } from 'express';
import { createPassenger, generateJwtToken, loginPassenger} from '../services/passenger.service';
import logger from '../utils/winston';

const router = express.Router();

// Route tạo mới passenger (đăng ký)
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, firstName, lastName, passportNumber } = req.body;

    if (!email || !password || !firstName || !lastName || !passportNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const passenger = await createPassenger({ email, password, firstName, lastName, passportNumber });
    const token = generateJwtToken(passenger.PassengerID, passenger.Email);

    res.status(201).json({ passenger, token });
  } catch (error: any) {
    logger.error(`Error creating passenger: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const { passenger, token } = await loginPassenger({ email, password });
    res.status(200).json({ passenger, token });
  } catch (error: any) {
    logger.error(`Error logging in passenger: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});


export default router;
