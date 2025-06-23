import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { ICreatePublicationDto } from '../../dtos/ICreatePublicationDto';
import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';


export class CreatePublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    data: ICreatePublicationDto[],
  ): Promise<Resolve> {
    await this.validateData(data);

    const publications = await this.repository.createBatch(data);
    return { status: 201, data: publications, success: true };
  }

  public async validateData(data: ICreatePublicationDto[]) {
    for (const item of data) {
      await ValidateDataHelperMethod(ICreatePublicationDto, item);
    }

    // const instances = plainToInstance(ICreatePublicationDto, data);

    // for (const instance of instances) {
    //   await validateOrReject(instance, {
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //   });
    // }
    // await ValidateDataHelperMethod(ICreateBatchPublicationsDto, data);
  }
}

