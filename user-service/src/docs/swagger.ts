import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import path from 'path';

// Configuración de Swagger
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Network API',
      version: '1.0.0',
      description: 'Documentación de las rutas de autenticación y usuarios',
    },
    servers: [
      {
        url: 'http://localhost:8083/api',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts')], // ← usa `.ts` si tus rutas también están migradas
};

// Generación del objeto Swagger
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
