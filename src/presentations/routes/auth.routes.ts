import { Router } from 'express';
import { Login } from '../../modules/auth/useCases/login';
import { RedefinePassword } from '../../modules/auth/useCases/redefinePassword';
import { ChangePassword } from '../../modules/auth/useCases/changePassword';
import { EnsureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';

const routes = Router();

routes.post('/login', Login);
routes.post('/redefine-password', RedefinePassword);

routes.patch(
  '/change-password',
  EnsureAuthenticatedMiddleware(true),
  ChangePassword
);

export { routes as authRoutes };
