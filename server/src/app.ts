import express from 'express';
import cors from 'cors';
import bookingRoutes from './routes/booking.routes';
import flightRoutes from './routes/flight.routes';
import passengerRoutes from './routes/passenger.routes'; 
import airportRoutes from './routes/airport.routes';
import { authenticateJWT } from './middlewares/auth.middleware';

// Tạo ứng dụng Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/passengers', passengerRoutes); 
app.use('/api/bookings', authenticateJWT ,bookingRoutes); 
app.use('/api/flights', authenticateJWT, flightRoutes);
app.use('/api/airports', authenticateJWT, airportRoutes);
export default app;
