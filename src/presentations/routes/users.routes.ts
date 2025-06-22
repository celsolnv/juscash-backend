import { Router } from 'express';
import { CreateUser } from '../../modules/users/useCases/create';
import { UpdateUser } from '../../modules/users/useCases/update';
import { FindUser } from '../../modules/users/useCases/find';

const routes = Router();

routes.post('/', CreateUser);
routes.put('/:id', UpdateUser);
routes.get('/:id', FindUser);

export { routes as userRoutes };
