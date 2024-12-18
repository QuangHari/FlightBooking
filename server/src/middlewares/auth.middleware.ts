import jwt from 'jsonwebtoken';
import {  Response, NextFunction } from 'express';
import logger from '../utils/winston';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateJWT = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    logger.error('Access Denied: No token provided');
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;
  }
    
  try {
    logger.info('Verifying JWT token');
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`JWT verification failed: ${error.message}`);
    } else {
      logger.error('JWT verification failed: Unknown error');
    }
    res.status(403).json({ message: 'Invalid token' });
  }
};
