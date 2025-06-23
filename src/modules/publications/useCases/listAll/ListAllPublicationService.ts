import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { IListAllPublicationsDTO } from '../../dtos/IListAllPublicationsDto';
import PaginationProvider from '../../../../utils/helpers/PaginationHelperMethod';


export class ListAllPublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    params: IListAllPublicationsDTO,
  ): Promise<Resolve> {

    const publications = await this.repository.listAll(params);
    return PaginationProvider({
      data: publications,
      page: params.page,
      limit: params.limit
    });
  }
}

