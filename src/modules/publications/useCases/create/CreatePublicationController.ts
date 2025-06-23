import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { CreatePublicationService } from './CreatePublicationService';

export class CreatePublicationController {
  constructor(private readonly CreatePublicationService: CreatePublicationService) { }

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.CreatePublicationService.execute(
        request.body,
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

