import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { ChangePasswordService } from './ChangePasswordService';

class ChangePasswordController {
  constructor(private readonly service: ChangePasswordService) {}

  public async handle(request: Request, response: Response) {
    try {
      const whoDoes = request.user;
      const resolve = await this.service.execute(request.body, whoDoes);
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { ChangePasswordController };
