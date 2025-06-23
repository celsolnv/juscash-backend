import { Router } from 'express';
import { CreatePublication } from '../../modules/publications/useCases/create';
import { CreateManyPublication } from '../../modules/publications/useCases/createBatch';
import { ListAllPublication } from '../../modules/publications/useCases/listAll';
import { UpdatePublication } from '../../modules/publications/useCases/update';

const routes = Router();

routes.post('/', CreatePublication);
routes.post('/batch', CreateManyPublication);
routes.get('/', ListAllPublication);
routes.put('/:id', UpdatePublication);

export { routes as publicationRoutes };
