import jwt from 'jsonwebtoken';

const JWT_SECRET = 'SANDALO'; // 🔐 clave temporal hardcodeada
const JWT_EXPIRES_IN = '1h'; // Duración del token, puede ser '1h', '2d', etc.

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface TokenPayload {
  id: number;
  alias: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
