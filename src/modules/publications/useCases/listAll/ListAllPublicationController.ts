import { Request, Response } from 'express';
import { error500, send } from '../../../../libs/return';
import { ListAllPublicationService } from './ListAllPublicationService';
import { PublicationStatus } from '../../../../entities/Publication';

export class ListAllPublicationController {
  constructor(private readonly ListAllPublicationService: ListAllPublicationService) { }

  public async handle(request: Request, response: Response) {
    try {
      const page = +(request.query.page as string) || 1;
      const limit = +(request.query.limit as string) || 10;

      const { status } = request.query as {
        status: PublicationStatus
      };

      const resolve = await this.ListAllPublicationService.execute(
        {
          search: request.query.search as string,
          status: status ? (status as PublicationStatus) : undefined,
          page,
          limit,
        },
      );
      return send(response, resolve);
    } catch (error) {
      return error500(response, error);
    }
  }
}

