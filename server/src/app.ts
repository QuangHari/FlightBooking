import express from 'express';
import cors from 'cors';
import bookingRoutes from './routes/booking.routes';
import passengerRoutes from './routes/passenger.routes'; 
import { authenticateJWT } from './middlewares/auth.middleware';

// Tạo ứng dụng Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/bookings', authenticateJWT ,bookingRoutes); 
app.use('/api/passengers', passengerRoutes); 
export default app;
