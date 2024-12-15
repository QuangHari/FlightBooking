import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface CreatePassengerInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
}

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const createPassenger = async (data: CreatePassengerInput) => {
  const { email, password, firstName, lastName, passportNumber } = data;

  // Kiểm tra nếu email đã tồn tại
  const existingPassenger = await prisma.passenger.findUnique({ where: { Email: email } });
  if (existingPassenger) {
    throw new Error('Email already in use');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Tạo Passenger mới
  const passenger = await prisma.passenger.create({
    data: {
      Email: email,
      Password: hashedPassword,
      FirstName: firstName,
      LastName: lastName,
      PassportNumber: passportNumber,
    }
  });

  return passenger;
};

export const generateJwtToken = (passengerId: number, email: string) => {
  const payload = { passengerId, email };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};
