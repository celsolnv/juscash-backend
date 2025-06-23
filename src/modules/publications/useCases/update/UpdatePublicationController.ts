import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { UpdatePublicationService } from './UpdatePublicationService';

export class UpdatePublicationController {
  constructor(private readonly updatePublicationService: UpdatePublicationService) { }

  public async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const resolve = await this.updatePublicationService.execute(
        +id,
        request.body,
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

