import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../repositories/typeorm/UserTypeormRepository';
import { FindUserService } from './FindUserService';
import { FindUserController } from './FindUserController';

const FindUser = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();
  const service = new FindUserService(repository);
  const controller = new FindUserController(service);
  return controller.handle(request, response);
};

export { FindUser };
