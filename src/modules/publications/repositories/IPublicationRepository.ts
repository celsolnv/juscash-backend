import { Publication } from "../../../entities/Publication";
import { ICreatePublicationDto } from "../dtos/ICreatePublicationDto";
import { IListAllPublicationsDTO } from "../dtos/IListAllPublicationsDto";

export abstract class IPublicationRepository {
  abstract findById(id: number): Promise<Publication | undefined>;
  abstract listAll(
    params: IListAllPublicationsDTO,
  ): Promise<[Publication[], number]>;
  abstract create(data: ICreatePublicationDto): Promise<{ id: number }>;
  abstract createBatch(data: ICreatePublicationDto[]): Promise<{ count: number }>;
  abstract update(id: number, data: ICreatePublicationDto): Promise<void>;

}