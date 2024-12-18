import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/winston';

export interface CreatePassengerInput {
  email: string;
  password: string;
  username: string;
}

export interface LoginPassengerInput {
  email: string;
  password: string;
}

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const createPassenger = async (data: CreatePassengerInput) => {
  logger.info('Attempting to create a new passenger', { email: data.email });
  const { email, password , username} = data;

  // Kiểm tra nếu email đã tồn tại
  const existingPassenger = await prisma.passenger.findUnique({ where: { Email: email } });
  if (existingPassenger) {
    logger.error(`Email already in use: ${email}`);
    throw new Error('Email already in use');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Tạo Passenger mới
  const passenger = await prisma.passenger.create({
    data: {
      Email: email,
      Password: hashedPassword,
      Username: data.username,
    }
  });

  logger.info(`Passenger created with email: ${email}`);
  return passenger;
};

export const generateJwtToken = (passengerId: number, email: string) => {
  const payload = { passengerId, email };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};


export const loginPassenger = async (data: LoginPassengerInput) => {
  const { email, password } = data;
  logger.info('Attempting to log in passenger', { email });

  const passenger = await prisma.passenger.findUnique({ where: { Email: email } });
  if (!passenger) {
    logger.error(`Login failed for email: ${email} - Invalid email or password`);
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, passenger.Password);
  if (!isPasswordValid) {
    logger.error(`Login failed for email: ${email} - Invalid email or password`);
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ passengerId: passenger.PassengerID, email: passenger.Email }, secretKey, { expiresIn: '1h' });

  logger.info(`Passenger logged in with email: ${email}`);
  return { passenger, token };
};