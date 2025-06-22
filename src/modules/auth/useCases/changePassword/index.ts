import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../../users/repositories/typeorm/UserTypeormRepository';
import { ChangePasswordService } from './ChangePasswordService';
import { ChangePasswordController } from './ChangePasswordController';

const ChangePassword = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();
  const service = new ChangePasswordService(repository);
  const controller = new ChangePasswordController(service);
  return controller.handle(request, response);
};

export { ChangePassword };
