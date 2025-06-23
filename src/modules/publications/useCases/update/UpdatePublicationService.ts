import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IPublicationRepository } from '../../repositories/IPublicationRepository';
import { IUpdatePublicationDto } from '../../dtos/IUpdatePublicationDto';
import { PublicationStatus } from '../../../../entities/Publication';


export class UpdatePublicationService {
  constructor(
    private readonly repository: IPublicationRepository,
  ) { }

  public async execute(
    id: number,
    data: IUpdatePublicationDto,
  ): Promise<Resolve> {
    await this.validateData(data);

    const publicationExist = await this.repository.findById(id);
    if (!publicationExist) {
      return {
        status: 404, data: { message: "Publicação não encontrada!" },
        success: false
      };
    }
    if (publicationExist.status === "done") {
      return {
        status: 400, data: { message: "Publicação já finalizada!" },
        success: false
      };
    }
    if (!data.status) {
      return {
        status: 400, data: { message: "Status é obrigatório!" },
        success: false
      };
    }

    const checkValidMove = this.checkValidMove(
      publicationExist.status,
      data.status,
    );
    if (!checkValidMove) {
      return {
        status: 400,
        data: { message: "Movimentação inválida! Entre em contato com o administrador" },
        success: false,
      };
    }
    const publication = await this.repository.update(id, data);
    return { status: 200, data: publication, success: true };
  }

  public checkValidMove(
    currentStatus: PublicationStatus,
    newStatus: PublicationStatus
  ): boolean {
    if (currentStatus === "new" && newStatus === "read") {
      return true;
    } else if (currentStatus === "read" && newStatus === "sent_to_lawyer") {
      return true;
    } else if (currentStatus === "sent_to_lawyer" && newStatus === "read") {
      return true;
    } else if (currentStatus === "sent_to_lawyer" && newStatus === "done") {
      return true;
    }
    return false;
  }

  public async validateData(data: IUpdatePublicationDto) {
    await ValidateDataHelperMethod(IUpdatePublicationDto, data);
  }
}

