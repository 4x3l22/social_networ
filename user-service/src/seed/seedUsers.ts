import db  from '../models';
import { UserInstance } from '../models/user';
import { UserRepository } from '../repository/user.repository';
import bcrypt from 'bcryptjs';

const userRepository = new UserRepository(db.user);

export const seedUsers = async (): Promise<UserInstance[]> => {
  const existingUsers = await userRepository.getAllUsers();

  if (existingUsers.length > 0) {
    console.log('Usuarios ya existen, omitiendo seeder.');
    return existingUsers;
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    userRepository.createUser({ alias: 'jdoe', name: 'John', lastName: 'Doe', password: hashedPassword, dateOfBirth: new Date('1990-01-01') }),
    userRepository.createUser({ alias: 'mjane', name: 'Mary', lastName: 'Jane', password: hashedPassword, dateOfBirth: new Date('1992-02-02') }),
    userRepository.createUser({ alias: 'ssmith', name: 'Steve', lastName: 'Smith', password: hashedPassword, dateOfBirth: new Date('1988-03-03') }),
  ]);

  console.log('Usuarios de prueba creados.');
  return users;
};
