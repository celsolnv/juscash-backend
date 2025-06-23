import { Request, Response } from 'express';
import { PublicationTypeormRepository } from '../../repositories/typeorm/PublicationTypeormRepository';
import { ListAllPublicationService } from './ListAllPublicationService';
import { ListAllPublicationController } from './ListAllPublicationController';

const ListAllPublication = (request: Request, response: Response) => {
  const repository = new PublicationTypeormRepository();

  const service = new ListAllPublicationService(
    repository,
  );

  const controller = new ListAllPublicationController(service);
  return controller.handle(request, response);
};

export { ListAllPublication };
