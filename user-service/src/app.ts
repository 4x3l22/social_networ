import express from 'express';
import cors from 'cors';
import db from './models';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', authRoutes);

db.sequelize.sync().then(() => {
  app.listen(8083, () => {
    console.log('Server is running on port 8083');
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});
