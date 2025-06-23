import { Router } from 'express';
import { CreatePublication } from '../../modules/publications/useCases/create';
import { CreateManyPublication } from '../../modules/publications/useCases/createBatch';
import { ListAllPublication } from '../../modules/publications/useCases/listAll';

const routes = Router();

routes.post('/', CreatePublication);
routes.post('/batch', CreateManyPublication);
routes.get('/', ListAllPublication);

export { routes as publicationRoutes };
