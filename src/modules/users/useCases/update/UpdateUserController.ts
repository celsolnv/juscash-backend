import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { UpdateUserService } from './UpdateUserService';

class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) { }

  public async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const resolve = await this.updateUserService.execute(
        id,
        request.body,
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { UpdateUserController };
