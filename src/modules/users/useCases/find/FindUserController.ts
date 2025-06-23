import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { FindUserService } from './FindUserService';

class FindUserController {
  constructor(private readonly findUserService: FindUserService) { }

  public async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const resolve = await this.findUserService.execute(id);
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { FindUserController };
