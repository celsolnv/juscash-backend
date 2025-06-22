import { Request, Response } from 'express';
import { UserTypeormRepository } from '../../../users/repositories/typeorm/UserTypeormRepository';
import { NodemailerProvider } from '../../../../providers/MailProvider';
import { HandlebarsProvider } from '../../../../providers/TemplateProvider';
import { RedefinePasswordService } from './RedefinePasswordService';
import { RedefinePasswordController } from './RedefinePasswordController';
import { JWTProvider } from '../../../../providers/TokenProvider';

const RedefinePassword = (request: Request, response: Response) => {
  const repository = new UserTypeormRepository();
  const tokenProvider = new JWTProvider();
  const templateProvider = new HandlebarsProvider();
  const mailProvider = new NodemailerProvider(templateProvider);

  const service = new RedefinePasswordService(
    repository,
    tokenProvider,
    mailProvider
  );
  const controller = new RedefinePasswordController(service);
  return controller.handle(request, response);
};

export { RedefinePassword };
