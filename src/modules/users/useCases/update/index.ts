import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../repositories/typeorm/UserTypeormRepository';
import { UpdateUserService } from './UpdateUserService';
import { UpdateUserController } from './UpdateUserController';

const UpdateUser = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();

  const service = new UpdateUserService(
    repository,
  );

  const controller = new UpdateUserController(service);
  return controller.handle(request, response);
};

export { UpdateUser };
