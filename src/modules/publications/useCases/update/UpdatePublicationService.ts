import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { IUpdatePublicationDto } from '../../dtos/IUpdatePublicationDto';


export class UpdatePublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    id: number,
    data: IUpdatePublicationDto,
  ): Promise<Resolve> {
    await this.validateData(data);

    const publication = await this.repository.update(id, data);
    return { status: 200, data: publication, success: true };
  }

  public async validateData(data: IUpdatePublicationDto) {
    await ValidateDataHelperMethod(IUpdatePublicationDto, data);
  }
}

