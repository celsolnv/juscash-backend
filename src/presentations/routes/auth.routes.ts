import { Router } from 'express';
import { Login } from '../../modules/auth/useCases/login';
import { RedefinePassword } from '../../modules/auth/useCases/redefinePassword';
import { ChangePassword } from '../../modules/auth/useCases/changePassword';

const routes = Router();

routes.post('/login', Login);
routes.post('/redefine/password', RedefinePassword);

routes.post(
  '/change/password',
  ChangePassword
);

export { routes as authRoutes };
