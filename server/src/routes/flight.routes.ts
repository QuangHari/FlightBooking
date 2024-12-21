import express from 'express';
import { createFlight, getFlightByFlightNumber, searchFlights ,getAllFlights , updateFlightSchedule} from '../services/flight.service';
import logger from '../utils/winston';

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
router.get('/number/:flightNumber', async (req, res) => {
  try {
    const { flightNumber } = req.params;  // Lấy flightNumber từ params
    const flight = await getFlightByFlightNumber(flightNumber);  // Gọi service tìm flight theo flightNumber
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
router.post('/search', async (req, res) => {
  try {
    const { origin, destination, startDate } = req.body;
    logger.info(`Searching flights from ${origin} to ${destination} starting from ${startDate}`);
          
    let parsedStartDate;
    if (startDate) {
      parsedStartDate = new Date(startDate as string);
    }

    const flights = await searchFlights(origin as string, destination as string, parsedStartDate);
    res.status(200).json(flights);
  } catch (error) {
    logger.error(`Error searching flights: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
  }

});
router.put('/update-schedule', async (req, res) => {
  try {
    const { flightId, newDepartureDateTime, newArrivalDateTime } = req.body;

    if (!flightId || !newDepartureDateTime || !newArrivalDateTime) {
      res.status(400).json({ error: 'Missing required fields: flightId, newDepartureDateTime, newArrivalDateTime' });
      return;
    }

    const updatedFlight = await updateFlightSchedule({
      flightId,
      newDepartureDateTime: new Date(newDepartureDateTime),
      newArrivalDateTime: new Date(newArrivalDateTime),
    });

    res.status(200).json(updatedFlight);
  } catch (error) {
    logger.error(`Error updating flight schedule: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
  }
});





export default router;
