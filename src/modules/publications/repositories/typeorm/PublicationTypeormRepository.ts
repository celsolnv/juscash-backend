import { Brackets, getRepository, Repository } from "typeorm";
import { IPublicationRepository } from "../IPublicationRepository";
import { Publication } from "../../../../entities/Publication";
import { ICreatePublicationDto } from "../../dtos/ICreatePublicationDto";
import { IListAllPublicationsDTO } from "../../dtos/IListAllPublicationsDto";
import { IUpdatePublicationDto } from "../../dtos/IUpdatePublicationDto";

export class PublicationTypeormRepository implements IPublicationRepository {
  private publicationRepository: Repository<Publication> = getRepository(Publication);

  public async findById(id: number): Promise<Publication | undefined> {
    return this.publicationRepository.findOne(id);
  }

  public async listAll(
    params: IListAllPublicationsDTO,
  ): Promise<[Publication[], number]> {
    const { search, status, page = 1, limit = 30, startDate, endDate } = params;

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

    if (startDate) {
      qb.andWhere("DATE(publication.published_at) >= DATE(:startDate)", { startDate });
    }

    if (endDate) {
      qb.andWhere("DATE(publication.published_at) <= DATE(:endDate)", { endDate });
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

  public async createBatch(data: ICreatePublicationDto[]): Promise<{ count: number }> {
    const publications = data.map((item) =>
      this.publicationRepository.create({
        ...item,
        value_principal: item.value_principal !== undefined ? Number(item.value_principal) : undefined,
        value_interest: item.value_interest !== undefined ? Number(item.value_interest) : undefined,
        value_attorney: item.value_attorney !== undefined ? Number(item.value_attorney) : undefined,
      })
    );

    const saved = await this.publicationRepository.save(publications);
    return { count: saved.length };
  }

  public async update(id: number, data: IUpdatePublicationDto): Promise<void> {
    const publication = await this.publicationRepository.preload({
      id,
      ...data,
    });

    if (!publication) {
      throw new Error("Publication not found");
    }

    await this.publicationRepository.save(publication);
  }
}
