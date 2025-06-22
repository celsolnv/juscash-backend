import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { RedefinePasswordService } from './RedefinePasswordService';

class RedefinePasswordController {
  constructor(private readonly service: RedefinePasswordService) {}

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.service.execute(request.body);
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { RedefinePasswordController };
