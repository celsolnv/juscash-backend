import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { LoginService } from './LoginService';

class LoginController {
  constructor(private readonly LoginService: LoginService) { }

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.LoginService.execute(request.body);
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

export { LoginController };
