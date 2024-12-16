import prisma from '../utils/prisma';
import logger from '../utils/winston';

export interface CreateAirportInput {
  airportCode: string;
  airportName: string;
  location: string;
  facilities?: string;
}

// Hàm tạo airport
export const createAirport = async (data: CreateAirportInput) => {
  const { airportCode, airportName, location, facilities } = data;

  logger.info('Attempting to create a new airport', { airportCode, airportName, location });

  try {
    // Kiểm tra nếu mã sân bay đã tồn tại
    const existingAirport = await prisma.airport.findUnique({
      where: { AirportCode: airportCode },
    });

    if (existingAirport) {
      logger.error(`Airport with code ${airportCode} already exists`);
      throw new Error('Airport with this code already exists');
    }

    // Tạo sân bay mới
    const airport = await prisma.airport.create({
      data: {
        AirportCode: airportCode,
        AirportName: airportName,
        Location: location,
        Facilities: facilities,
      },
    });

    logger.info('Airport created successfully', { airportCode });
    return airport;
  } catch (error) {
    logger.error('Error creating airport', { error: (error as Error).message });
    throw error;
  }
};

// Hàm lấy danh sách tất cả sân bay
export const getAllAirports = async () => {
  logger.info('Fetching all airports');

  try {
    const airports = await prisma.airport.findMany();
    logger.info('Airports fetched successfully', { count: airports.length });
    return airports;
  } catch (error) {
    logger.error('Error fetching airports', { error: (error as Error).message });
    throw error;
  }
};
