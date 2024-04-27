import jwt from 'jsonwebtoken';
import { secretKey } from '../../config.json';

export function generateUniqueToken() {
  const token = jwt.sign({}, secretKey, { expiresIn: '31d' });
  return token;
};