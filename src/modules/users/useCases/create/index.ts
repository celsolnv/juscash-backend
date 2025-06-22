import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../repositories/typeorm/UserTypeormRepository';
import { CreateUserService } from './CreateUserService';
import { CreateUserController } from './CreateUserController';

const CreateUser = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();

  const service = new CreateUserService(
    repository,
  );

  const controller = new CreateUserController(service);
  return controller.handle(request, response);
};

export { CreateUser };
