import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { ICreatePublicationDto } from '../../dtos/ICreatePublicationDto';


export class CreatePublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    data: ICreatePublicationDto,
  ): Promise<Resolve> {
    await this.validateData(data);

    const publication = await this.repository.create(data);
    return { status: 201, data: publication, success: true };
  }

  public async validateData(data: ICreatePublicationDto) {
    await ValidateDataHelperMethod(ICreatePublicationDto, data);
  }
}

