import cors from 'cors';
import express from 'express';
import { routes } from './presentations/routes';
import 'express-async-errors';
import { resolve } from 'path';
import { Paths } from './configs/Paths';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use('/files', express.static(resolve(Paths.UPLOADS)));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('', (request, response) => {
  return response.status(404).json({
    error: `${request.path} is not Found.`
  });
});

app.use((err: Error, request: express.Request, response: express.Response) => {
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

export { app };
