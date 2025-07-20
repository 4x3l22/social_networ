import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const response = await axios.post(
      'http://localhost:8083/api/user/verify-token',
      {},
      { headers: { Authorization: authHeader } }
    );

    // Adjunta el usuario decodificado a la request
    (req as any).user = response.data.user;

    next();
  } catch (error: any) {
    return res.status(403).json({ message: 'Token inválido o expirado', error: error.message });
  }
};
