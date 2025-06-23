import { Request, Response } from 'express';
import { PublicationTypeormRepository } from '../../repositories/typeorm/PublicationTypeormRepository';
import { UpdatePublicationService } from './UpdatePublicationService';
import { UpdatePublicationController } from './UpdatePublicationController';

const UpdatePublication = (request: Request, response: Response) => {
  const repository = new PublicationTypeormRepository();

  const service = new UpdatePublicationService(
    repository,
  );

  const controller = new UpdatePublicationController(service);
  return controller.handle(request, response);
};

export { UpdatePublication };
