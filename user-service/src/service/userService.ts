import bcrypt from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';
import { generateToken, verifyToken } from '../utils/jwt';
import { UserCreationAttributes, UserInstance } from '../models/user';
import db from '../models';
import { UserDTO } from '../interface/user';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  user: any; 
  token: string;
}
const userRepo = new UserRepository(db.user);

export const register = async (data: UserCreationAttributes): Promise<RegisterResponse> => {
  const { alias, password, ...rest } = data;

  const existing = await userRepo.findUserByAlias(alias);
  if (existing) throw new Error('Alias ya registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser({ ...rest, alias, password: hashedPassword });

  if(!user.id){
    throw new Error('Error al crear el usuario');
  }
  const token = generateToken({ id: user.id, alias: user.alias });
  return { user, token };
};

export const existingUser = async (alias: string): Promise<any> => {
  const existing = await userRepo.findUserByAlias(alias);
  if (existing) throw new Error('Alias ya registrado');
  return existing;
};

export const login = async (alias: string, password: string): Promise<LoginResponse> => {
  const user = await userRepo.findUserByAlias(alias);
  if (!user) throw new Error('Usuario no encontrado');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Contraseña incorrecta');

  if(!user.id){
    throw new Error('Error al iniciar sesión');
  }
  const token = generateToken({ id: user.id, alias: user.alias, name: user.name, lastName: user.lastName });
  return { token };
};

export const veryfyToken = async (token: string): Promise<any> => {
  const decoded = verifyToken(token);
  if (!decoded) throw new Error('Token inválido');
  return decoded;
}

export const findAllbyIds = async (ids: number[]): Promise<UserDTO[]> => {
  const users: UserInstance[] = await userRepo.findUsersByIds(ids);

  if (!users || users.length === 0) {
    throw new Error('No se encontraron usuarios');
  }

  const result: UserDTO[] = users.map(user => ({
    alias: user.alias,
    name: user.name,
    lastName: user.lastName
  }));

  return result;
}