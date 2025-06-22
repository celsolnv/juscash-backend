import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../../users/repositories/typeorm/UserTypeormRepository';
import { JWTProvider } from '../../../../providers/TokenProvider';
import { BcryptHashProvider } from '../../../../providers/HashProvider';
import { LoginService } from './LoginService';
import { LoginController } from './LoginController';

const Login = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();
  const tokenProvider = new JWTProvider();
  const hashProvider = new BcryptHashProvider();

  const service = new LoginService(
    repository,
    tokenProvider,
    hashProvider
  );

  const controller = new LoginController(service);
  return controller.handle(request, response);
};

export { Login };
