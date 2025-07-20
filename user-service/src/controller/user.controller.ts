import e, { Request, Response } from 'express';
import * as userService from '../service/userService';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await userService.register(req.body);
    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { alias, password } = req.body;
    const { token } = await userService.login(alias, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.body.token || req.headers.authorization?.split(' ')[1];
    
    const decoded = await userService.veryfyToken(token);
    res.status(200).json({ decoded });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export const getUsersByIds = async (req: Request, res: Response) => {
  try {
    const idsParam = req.query.ids as string;

    if (!idsParam) {
      return res.status(400).json({ message: 'Parámetro "ids" es requerido' });
    }

    const ids = idsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(Number.isInteger);

    if (ids.length === 0) {
      return res.status(400).json({ message: 'No se encontraron IDs válidos' });
    }

    const users = await userService.findAllbyIds(ids);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
