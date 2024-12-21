  import prisma from '../utils/prisma';
  import logger from '../utils/winston'; 

  export interface CreateFlightInput {
    flightNumber: string;
    departureDateTime: Date;
    arrivalDateTime: Date;
    originAirportCode: string;
    destinationAirportCode: string;
    availableSeats: number;
    aircraftID?: number;
    businessPrice?: number;
    businessSeats?: number;
    economyPrice?: number;
    economySeats?: number;
  }

  export const createFlight = async (data: CreateFlightInput) => {
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
    } = data;
    logger.info('Attempting to create a new flight', { flightNumber, originAirportCode, destinationAirportCode });
    logger.info('Origin Airport Code:', originAirportCode);
    logger.info('Destination Airport Code:', destinationAirportCode);

    if (departureDateTime >= arrivalDateTime) {
      logger.error('Invalid date range', { departureDateTime, arrivalDateTime });
      throw new Error('Departure time must be earlier than arrival time');
    }
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
          AircraftID: aircraftID,
          BusinessPrice: businessPrice,
          BusinessSeats: businessSeats,
          EconomyPrice: economyPrice,
          EconomySeats: economySeats,
        },
      });

      logger.info('Flight created successfully', { flightID: flight.FlightID });
      return flight;
    } catch (error) {
      logger.error('Error creating flight', { error: (error as Error).message });
      throw error;
    }
  };

  export const getFlightByFlightNumber = async (flightNumber: string) => {
    logger.info(`Fetching flight details for FlightNumber: ${flightNumber}`);

    try {
      const flight = await prisma.flight.findUnique({
        where: { FlightNumber: flightNumber },  // Thay thế bằng FlightNumber
        include: {
          OriginAirport: true,
          DestinationAirport: true,
          Seats: true,
        },
      });

      if (!flight) {
        logger.error(`Flight not found: FlightNumber ${flightNumber}`);
        throw new Error('Flight not found');
      }

      logger.info('Flight details retrieved successfully', { flightNumber: flightNumber });
      return flight;
    } catch (error) {
      logger.error('Error fetching flight details', { flightNumber: flightNumber, error: (error as Error).message });
      throw error;
    }
};


  export interface SearchFlightInput {
      origin: string;
      destination: string;
    }


  export const getAllFlights = async () => {
      logger.info('Fetching all flights');
    
      try {
        const flights = await prisma.flight.findMany({
          include: {
            OriginAirport: true,
            DestinationAirport: true,
            Seats: true,
            Aircraft: { 
              select: {
                Name: true, 
              },
            },
          },
        });
    
        logger.info('All flights retrieved successfully');
        return flights;
      } catch (error) {
        logger.error('Error fetching all flights', { error: (error as Error).message });
        throw error
      }

  }

  export const searchFlights = async (
    origin: string,
    destination: string,
    startDate?: Date
  ) => {
    // Validate input parameters
    if (!origin || !destination) {
      throw new Error('Both origin and destination airport codes are required.');
    }
  
    logger.info(
      `Searching flights from ${origin} to ${destination} starting from ${
        startDate ? startDate.toISOString() : 'any date'
      }`
    );
  
    try {
      // Build dynamic query
      const flights = await prisma.flight.findMany({
        where: {
          OriginAirportCode: origin,
          DestinationAirportCode: destination,
          ...(startDate && { DepartureDateTime: { gte: startDate } }),
        },
        include: {
          OriginAirport: {
            select: {
              AirportCode: true,
              AirportName: true,
              Location: true,
            },
          },
          DestinationAirport: {
            select: {
              AirportCode: true,
              AirportName: true,
              Location: true,
            },
          },
          Aircraft: {
            select: {
              AircraftID: true,
              Name: true, // Ensure this field is always populated in the DB
            },
          },
          Seats: true,
        },
      });
  
      if (flights.length === 0) {
        logger.warn(
          `No flights found for origin: ${origin}, destination: ${destination}, startDate: ${
            startDate ? startDate.toISOString() : 'any date'
          }`
        );
        return []; // Return empty array instead of throwing an error
      }
  
      logger.info('Flights retrieved successfully');
      return flights;
    } catch (error) {
      logger.error('Error searching for flights', {
        origin,
        destination,
        startDate,
        error: (error as Error).message,
      });
      throw new Error('An error occurred while searching for flights. Please try again.');
    }
  };
  


  export interface UpdateFlightScheduleInput {
    flightId: number;
    newDepartureDateTime: Date;
    newArrivalDateTime: Date;
  }
  
  export const updateFlightSchedule = async (data: UpdateFlightScheduleInput) => {
    const { flightId, newDepartureDateTime, newArrivalDateTime } = data;
  
    logger.info(`Attempting to update flight schedule for FlightID: ${flightId}`, {
      newDepartureDateTime,
      newArrivalDateTime,
    });
  
    if (newDepartureDateTime >= newArrivalDateTime) {
      logger.error('Invalid date range', { newDepartureDateTime, newArrivalDateTime });
      throw new Error('Departure time must be earlier than arrival time');
    }
  
    try {
      // Tìm chuyến bay theo ID
      const flight = await prisma.flight.findUnique({
        where: { FlightID: flightId },
      });
  
      if (!flight) {
        logger.error(`Flight not found: FlightID ${flightId}`);
        throw new Error('Flight not found');
      }
  
      // Cập nhật thông tin giờ của chuyến bay
      const updatedFlight = await prisma.flight.update({
        where: { FlightID: flightId },
        data: {
          DepartureDateTime: newDepartureDateTime,
          ArrivalDateTime: newArrivalDateTime,
        },
      });
  
      logger.info('Flight schedule updated successfully', { flightID: updatedFlight.FlightID });
      return updatedFlight;
    } catch (error) {
      logger.error('Error updating flight schedule', { error: (error as Error).message });
      throw error;
    }
  };