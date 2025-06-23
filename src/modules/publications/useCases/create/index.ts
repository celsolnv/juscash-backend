import { Request, Response } from 'express';
import { PublicationTypeormRepository } from '../../repositories/typeorm/PublicationTypeormRepository';
import { CreatePublicationService } from './CreatePublicationService';
import { CreatePublicationController } from './CreatePublicationController';

const CreatePublication = (request: Request, response: Response) => {
  const repository = new PublicationTypeormRepository();

  const service = new CreatePublicationService(
    repository,
  );

  const controller = new CreatePublicationController(service);
  return controller.handle(request, response);
};

export { CreatePublication };
