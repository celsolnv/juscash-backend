import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { CreateUserService } from './CreateUserService';

class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) { }

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.createUserService.execute(
        request.body,
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { CreateUserController };
