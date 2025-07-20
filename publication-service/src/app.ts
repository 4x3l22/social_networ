import express from 'express';
import cors from 'cors';
import db from './models';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import dotenv from 'dotenv';
import { seedPublications } from './seed/seed.publication';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/publication', authRoutes);

const startServer = async () => {
  try {
    await db.sequelize.sync();
    await seedPublications();

    app.listen(8084, () => {
      console.log('Server is running on port 8084');
    });
  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);
  }
};

startServer();
