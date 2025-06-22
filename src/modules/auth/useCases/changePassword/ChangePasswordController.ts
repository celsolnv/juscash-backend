import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { ChangePasswordService } from './ChangePasswordService';

class ChangePasswordController {
  constructor(private readonly service: ChangePasswordService) { }

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.service.execute(request.body);
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { ChangePasswordController };
