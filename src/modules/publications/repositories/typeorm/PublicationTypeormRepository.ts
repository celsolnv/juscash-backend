import { Brackets, getRepository, Repository } from "typeorm";
import { IPublicationRepository } from "../IPublicationRepository";
import { Publication } from "../../../../entities/Publication";
import { ICreatePublicationDto } from "../../dtos/ICreatePublicationDto";
import { IListAllPublicationsDTO } from "../../dtos/IListAllPublicationsDto";

export class PublicationTypeormRepository implements IPublicationRepository {
  private publicationRepository: Repository<Publication> = getRepository(Publication);

  public async findById(id: number): Promise<Publication | undefined> {
    return this.publicationRepository.findOne(id);
  }

  public async listAll(
    params: IListAllPublicationsDTO,
  ): Promise<[Publication[], number]> {
    const { search, status, page, limit } = params;

    const qb = this.publicationRepository.createQueryBuilder("publication");

    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where("publication.case_number LIKE :search", { search: `%${search}%` })
            .orWhere("publication.plaintiff LIKE :search", { search: `%${search}%` })
            .orWhere("publication.attorney LIKE :search", { search: `%${search}%` })
            .orWhere("publication.defendant LIKE :search", { search: `%${search}%` });
        }),
      );
    }

    if (status) {
      qb.andWhere("publication.status = :status", { status });
    }

    qb.orderBy("publication.created_at", "DESC");

    qb.skip((page - 1) * limit);
    qb.take(limit);

    return qb.getManyAndCount();
  }

  public async create(data: ICreatePublicationDto): Promise<{ id: number }> {
    const publication = this.publicationRepository.create({
      ...data,
      value_principal: data.value_principal !== undefined ? Number(data.value_principal) : undefined,
      value_interest: data.value_interest !== undefined ? Number(data.value_interest) : undefined,
      value_attorney: data.value_attorney !== undefined ? Number(data.value_attorney) : undefined,
    });
    const saved = await this.publicationRepository.save(publication);
    return { id: saved.id };
  }

  public async update(id: number, data: ICreatePublicationDto): Promise<void> {
    const publication = await this.publicationRepository.preload({
      id,
      ...data,
      value_principal: data.value_principal !== undefined ? Number(data.value_principal) : undefined,
      value_interest: data.value_interest !== undefined ? Number(data.value_interest) : undefined,
      value_attorney: data.value_attorney !== undefined ? Number(data.value_attorney) : undefined,
    });

    if (!publication) {
      throw new Error("Publication not found");
    }

    await this.publicationRepository.save(publication);
  }
}
