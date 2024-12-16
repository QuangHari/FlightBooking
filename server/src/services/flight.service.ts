import prisma from '../utils/prisma';
import logger from '../utils/winston'; 

export interface CreateFlightInput {
  flightNumber: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  originAirportCode: string;
  destinationAirportCode: string;
  availableSeats: number;
}

export const createFlight = async (data: CreateFlightInput) => {
  const {
    flightNumber,
    departureDateTime,
    arrivalDateTime,
    originAirportCode,
    destinationAirportCode,
    availableSeats,
  } = data;

  logger.info('Attempting to create a new flight', { flightNumber, originAirportCode, destinationAirportCode });

  try {
    // Kiểm tra mã sân bay gốc và đích tồn tại
    const originAirport = await prisma.airport.findUnique({
      where: { AirportCode: originAirportCode },
    });

    if (!originAirport) {
      logger.error(`Origin airport not found: ${originAirportCode}`);
      throw new Error('Origin airport not found');
    }

    const destinationAirport = await prisma.airport.findUnique({
      where: { AirportCode: destinationAirportCode },
    });

    if (!destinationAirport) {
      logger.error(`Destination airport not found: ${destinationAirportCode}`);
      throw new Error('Destination airport not found');
    }

    // Tạo flight
    const flight = await prisma.flight.create({
      data: {
        FlightNumber: flightNumber,
        DepartureDateTime: departureDateTime,
        ArrivalDateTime: arrivalDateTime,
        OriginAirportCode: originAirportCode,
        DestinationAirportCode: destinationAirportCode,
        AvailableSeats: availableSeats,
      },
    });

    logger.info('Flight created successfully', { flightID: flight.FlightID });
    return flight;
  } catch (error) {
    logger.error('Error creating flight', { error: (error as Error).message });
    throw error;
  }
};

export const getFlightById = async (flightId: number) => {
  logger.info(`Fetching flight details for FlightID: ${flightId}`);

  try {
    const flight = await prisma.flight.findUnique({
      where: { FlightID: flightId },
      include: {
        OriginAirport: true,
        DestinationAirport: true,
        Seats: true,
      },
    });

    if (!flight) {
      logger.error(`Flight not found: FlightID ${flightId}`);
      throw new Error('Flight not found');
    }

    logger.info('Flight details retrieved successfully', { flightID: flightId });
    return flight;
  } catch (error) {
    logger.error('Error fetching flight details', { flightID: flightId, error: (error as Error).message });
    throw error;
  }
};

export interface SearchFlightInput {
    origin: string;
    destination: string;
  }

export const searchFlights = async (origin: string, destination: string, startDate?: Date) => {
    logger.info(`Searching flights from ${origin} to ${destination} starting from ${startDate ? startDate.toISOString() : 'any date'}`);
  
    try {
      const flights = await prisma.flight.findMany({
        where: {
          OriginAirportCode: origin,
          DestinationAirportCode: destination,
          ...(startDate && { DepartureDateTime: { gte: startDate } }),
        },
        include: {
          OriginAirport: true,
          DestinationAirport: true,
          Seats: true,
        },
      });
  
      if (flights.length === 0) {
        logger.warn(`No flights found for origin: ${origin}, destination: ${destination}, startDate: ${startDate ? startDate.toISOString() : 'any date'}`);
        throw new Error('No flights found');
      }
  
      logger.info('Flights retrieved successfully');
      return flights;
    } catch (error) {
      logger.error('Error searching for flights', { origin, destination, startDate, error: (error as Error).message });
      throw error;
    }
  };
  
  