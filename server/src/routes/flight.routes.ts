import express from 'express';
import { createFlight, getFlightById, searchFlights ,getAllFlights} from '../services/flight.service';
import { log } from 'winston';

const router = express.Router();

// Endpoint để tạo flight
router.post('/', async (req, res) => {
  try {
    const {
      flightNumber,
      departureDateTime,
      arrivalDateTime,
      originAirportCode,
      destinationAirportCode,
      availableSeats,
      aircraftID = 0,
      businessPrice = 0.0,
      businessSeats = 0,
      economyPrice = 0.0,
      economySeats = 0,
    } = req.body;
    
    const newFlight = await createFlight({
      flightNumber,
      departureDateTime: new Date(departureDateTime),
      arrivalDateTime: new Date(arrivalDateTime),
      originAirportCode,
      destinationAirportCode,
      availableSeats,
      aircraftID,
      businessPrice,
      businessSeats,
      economyPrice,
      economySeats,
    });

    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Endpoint để lấy thông tin flight theo ID
router.get('/id/:id', async (req, res) => {
  try {
    const flightId = parseInt(req.params.id, 10);
    const flight = await getFlightById(flightId);
    res.status(200).json(flight);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});


router.get('/', async (req, res) => {
  try {
    const flights = await getAllFlights();
    res.status(200).json(flights);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Endpoint để tìm kiếm các chuyến bay
router.get('/search', async (req, res) => {
  try {
    const { origin, destination, startDate } = req.body;
      
    let parsedStartDate;
    if (startDate) {
      parsedStartDate = new Date(startDate as string);
    }

    const flights = await searchFlights(origin as string, destination as string, parsedStartDate);
    res.status(200).json(flights);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
