import { Request, Response } from 'express';
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
