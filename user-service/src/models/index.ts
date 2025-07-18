import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { Dialect } from 'sequelize/types';

// Importa tus modelos como funciones que reciben `sequelize` y `DataTypes`
import defineUserModel from './user';

// Define el tipo para tu archivo de configuración
interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  logging?: boolean | ((sql: string, timing?: number) => void);
}

const env = process.env.NODE_ENV || 'development';

// Carga configuración desde el archivo config.json
const configPath = path.join(__dirname, '../config/config.json');
const config: DBConfig = require(configPath)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging,
});

const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  user: ReturnType<typeof defineUserModel>;
} = {
  sequelize,
  Sequelize,
  user: defineUserModel(sequelize, DataTypes),
};

export default db;
