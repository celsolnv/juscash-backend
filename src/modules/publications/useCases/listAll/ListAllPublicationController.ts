import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { ListAllPublicationService } from './ListAllPublicationService';

export class ListAllPublicationController {
  constructor(private readonly ListAllPublicationService: ListAllPublicationService) { }

  public async handle(request: Request, response: Response) {
    try {
      const resolve = await this.ListAllPublicationService.execute(
        request.body,
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

