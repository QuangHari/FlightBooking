import prisma from '../utils/prisma';
import logger from '../utils/winston';

export interface CreatePlaneInput {
  name: string;
  capacity: number;
  details?: string;
}

// Hàm tạo máy bay
export const createPlane = async (data: CreatePlaneInput) => {
  const { name, capacity, details } = data;

  logger.info('Attempting to create a new plane', { name, capacity });

  try {
    // Kiểm tra nếu tên máy bay đã tồn tại
    const existingPlane = await prisma.aircraft.findFirst({
      where: { Name: name },
    });

    if (existingPlane) {
      logger.error(`Plane with name ${name} already exists`);
      throw new Error('Plane with this name already exists');
    }

    // Tạo máy bay mới
    const plane = await prisma.aircraft.create({
      data: {
        Name: name,
        Capacity: capacity,
        Details: details,
      },
    });

    logger.info('Plane created successfully', { name });
    return plane;
  } catch (error) {
    logger.error('Error creating plane', { error: (error as Error).message });
    throw error;
  }
};

// Hàm lấy danh sách tất cả máy bay
export const getAllPlanes = async () => {
  logger.info('Fetching all planes');

  try {
    const planes = await prisma.aircraft.findMany();
    logger.info('Planes fetched successfully', { count: planes.length });
    return planes;
  } catch (error) {
    logger.error('Error fetching planes', { error: (error as Error).message });
    throw error;
  }
};
