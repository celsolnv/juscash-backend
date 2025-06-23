import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { IListAllPublicationsDTO } from '../../dtos/IListAllPublicationsDto';


export class ListAllPublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    data: IListAllPublicationsDTO,
  ): Promise<Resolve> {

    const user = await this.repository.listAll(data);
    return { status: 201, data: user, success: true };
  }
}

