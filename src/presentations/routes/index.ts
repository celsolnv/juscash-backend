import { Router } from 'express';
import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { EnsureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';


const routes = Router();
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

routes.use(EnsureAuthenticatedMiddleware());


export { routes };
