import express from 'express';
import cors from 'cors';
import db from './models';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import dotenv from 'dotenv';
import { seedUsers } from './seed/seedUsers';


dotenv.config();

const app = express();

(async () => {
  await db.sequelize.sync();
  console.log('Database synchronized');
})();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', authRoutes);

const startServer = async () => {
  try {
    await db.sequelize.sync();
    await seedUsers();

    app.listen(8083, () => {
      console.log('Server is running on port 8083');
    });
  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);
  }
};

startServer();

